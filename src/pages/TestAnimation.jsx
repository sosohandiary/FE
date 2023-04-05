import { useEffect, useRef, useState } from "react";
import React from "react";
import styled from "styled-components";
import { WholeAreaWithMargin } from "../styles/WholeAreaStyle";
import { Stage, Layer, Line, Transformer, Image } from "react-konva";
import useImage from "use-image";
import { useQuery } from "react-query";
import axios from "axios";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useParams } from "react-router-dom";
import RightSideSlider from "../components/test-component/RightSideSlider";
import BottomSlider from "../components/test-component/BottomSlider";
import { Global } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

// <---------------스티커 크기 조절----------------->
const ImageSticker = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  sticker,
  mode,
}) => {
  // <--------------->
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // 스티커 사전

  const [imgUrl0] = useImage(
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FQI9l1%2Fbtr4t7oeBhs%2FMYKvXRiLsy4mINf9Egxb30%2Fimg.png"
  );
  const [imgUrl1] = useImage(
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdXWxWU%2Fbtr4tOJkV2M%2FdYfSWPVUkDz5i7K0lZnJ80%2Fimg.png"
  );
  const [imgUrl2] = useImage(
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcl8BFN%2Fbtr4voJMOf7%2FdmfbZkelRI171YwUDcRdj0%2Fimg.png"
  );

  const imgList = [imgUrl0, imgUrl1, imgUrl2];

  return (
    <React.Fragment>
      <Image
        image={imgList[sticker.stickerUrlNum]}
        key={sticker.id}
        id={sticker.id}
        x={sticker.x}
        y={sticker.y}
        numPoints={5}
        innerRadius={20}
        outerRadius={40}
        opacity={0.8}
        draggable={mode === "STICKER" ? true : false}
        rotation={sticker.rotation}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={sticker.isDragging ? 10 : 5}
        shadowOffsetY={sticker.isDragging ? 10 : 5}
        scaleX={sticker.isDragging ? 1.2 : 1}
        scaleY={sticker.isDragging ? 1.2 : 1}
        onDragStart={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
            isDragging: true,
          });
        }}
        // onDragEnd={handleDragEnd}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
            isDragging: false,
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

// <---------------------------------------->

const TestAnimation = () => {
  const [mode, setMode] = useState("TEXT");
  const [lineTool, setLineTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const { diaryid, paperid } = useParams();

  const changeModeHandler = (target) => {
    setMode(target);
  };

  const accessToken = localStorage.getItem("accessToken");

  // 드래그 시  스크롤 방지
  useEffect(() => {
    function preventBehavior(e) {
      e.preventDefault();
    }
    document.addEventListener("touchmove", preventBehavior, { passive: false });
  }, []);

  // <=== 데이터 겟===>
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/diary/${diaryid}/detail/${paperid}`,
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        if (res.data.customJson.length > 10) {
          const resJson = JSON.parse(res.data.customJson);
          setStickers(resJson.stickers);
          setLines(resJson.lines);
          window.localStorage.setItem(
            "draft-js-example-item",
            JSON.stringify(resJson.texts)
          );
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // <-------------- 스티커 관련 -------------->

  const [stickers, setStickers] = useState([]);

  // 변형할 것 선택 관련
  const [selectedId, selectShape] = React.useState(null);

  // 스티커 추가 관련
  const addStickerButtonHandler = (num) => {
    const newSticker = {
      id: stickers.length,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      width: 100,
      height: 100,
      rotation: 45,
      isDragging: false,
      stickerUrlNum: num,
    };
    const newStickerList = stickers.concat();
    newStickerList.push(newSticker);
    setStickers(newStickerList);
  };

  // <-------------- 그리기 관련 -------------->
  const handleMouseDown = (e) => {
    //스티커 변형 초기화
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }

    //그리기 시작
    if (mode === "DRAW") {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([
        ...lines,
        { lineTool, lineColor, lineWidth, points: [pos.x, pos.y] },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  // 텍스트 - Draft관련
  const TEXT_EDITOR_ITEM = "draft-js-example-item";

  const data = localStorage.getItem(TEXT_EDITOR_ITEM);
  const initialState = data
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(data)))
    : EditorState.createEmpty();
  const [editorState, setEditorState] = useState(initialState);

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleTogggleClick = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleSave = () => {
    const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    localStorage.setItem(TEXT_EDITOR_ITEM, data);

    const allData = {
      stickers,
      lines,
      texts: convertToRaw(editorState.getCurrentContent()),
    };

    const allJSON = JSON.stringify(allData);

    const sendData = { thumbnail: "", customJson: allJSON };

    axios
      .patch(
        `${process.env.REACT_APP_BASEURL}/diary/${diaryid}/detail/${paperid}`,
        sendData,
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        console.log("res : ", res);
      })
      .catch((err) => console.log(err));
  };

  const changeColorHandler = (target) => {
    setLineColor(target);
  };
  const changeWidthHandler = (target) => {
    setLineWidth(target);
  };
  const changeLineTool = (target) => {
    setLineTool(target);
  };

  //도구 모음 창
  const Toolbar = () => {
    const onClickSaveStickerHandler = () => {
      const accessToken = localStorage.getItem("accessToken");

      axios.post(`${process.env.REACT_APP_BASEURL}/decoration/`, stickers, {
        headers: { Authorization: accessToken },
      });
    };

    return (
      <div style={{ position: "sticky", zIndex: 10 }}>
        <button onClick={(e) => changeModeHandler("TEXT")}>텍스트 모드</button>
        <button onClick={() => changeModeHandler("DRAW")}>그리기 모드</button>
        <button onClick={() => changeModeHandler("STICKER")}>
          스티커 모드
        </button>
        <button onClick={() => changeColorHandler("#df4b26")}>빨간색</button>
        <button onClick={() => changeColorHandler("#2645df")}>파란색</button>
        <button onClick={() => changeWidthHandler(5)}>굵게</button>
        <button onClick={() => changeWidthHandler(1)}>얇게</button>
        <button onClick={() => changeLineTool("eraser")}>지우개</button>
        <button onClick={() => changeLineTool("pen")}>펜</button>
        <div>
          스티커 관련
          <button onClick={() => addStickerButtonHandler(0)}>
            0번 스티커 추가
          </button>
          <button onClick={() => addStickerButtonHandler(1)}>
            1번 스티커 추가
          </button>
          <button onClick={() => addStickerButtonHandler(2)}>
            2번 스티커 추가
          </button>
          <button onClick={onClickSaveStickerHandler}>스티커 저장</button>
          <button>이미지로 저장</button>
        </div>
      </div>
    );
  };

  //툴바 관련
  const [isOpenAllToolbar, setIsOpenAllToolbar] = useState(true);
  const [isOpenTextToolbar, setIsOpenTextToolbar] = useState(false);
  const [isOpenDrawToolbar, setIsOpenDrawToolbar] = useState(false);
  const [isOpenStickerToolbar, setIsOpenStickerToolbar] = useState(false);

  const [lineColor, setLineColor] = useState("#e74b24");
  const [lineWidth, setLineWidth] = useState(5);

  const touchAllToolbarButtonHandler = (props) => {
    switch (props) {
      case "TEXT":
        setIsOpenTextToolbar(true);
        setMode("TEXT");
        return;
      case "DRAW":
        setIsOpenAllToolbar(false);
        setIsOpenDrawToolbar(true);
        setMode("DRAW");
        return;
      case "STICKER":
        setIsOpenAllToolbar(false);
        setIsOpenStickerToolbar(true);
        setMode("STICKER");
        return;
      default:
        return;
    }
  };

  // 도화지
  return (
    <WholeAreaWithMargin>
      <Toolbar />
      <BackgroundStyle></BackgroundStyle>
      <TextAreaStyle mode={mode}></TextAreaStyle>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        style={{ position: "absolute", top: "40px" }}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.lineColor}
              strokeWidth={line.lineWidth}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.lineTool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
          {stickers.map((sticker, i) => {
            return (
              <ImageSticker
                key={i}
                mode={mode}
                shapeProps={sticker}
                isSelected={sticker.id === selectedId}
                sticker={sticker}
                onSelect={() => {
                  if (mode === "STICKER") {
                    selectShape(sticker.id);
                  }
                }}
                onChange={(newAttrs) => {
                  const sticks = stickers.slice();
                  sticks[i] = newAttrs;
                  setStickers(sticks);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
      <AllToolbarStyle isOpenAllToolbar={isOpenAllToolbar}>
        <ToolButton onClick={() => touchAllToolbarButtonHandler("TEXT")}>
          Text
        </ToolButton>
        <ToolButton onClick={() => touchAllToolbarButtonHandler("DRAW")}>
          Draw
        </ToolButton>
        <ToolButton onClick={() => touchAllToolbarButtonHandler("STICKER")}>
          Sticker
        </ToolButton>
        <ToolButton onClick={() => touchAllToolbarButtonHandler()}>
          Paper
        </ToolButton>
      </AllToolbarStyle>

      <TextToolbarStyle isOpenTextToolbar={isOpenTextToolbar}>
        <ToolButton
          onMouseDown={() => {
            setIsOpenTextToolbar(false);
            setMode("TEXT");
          }}
        >
          BAC
        </ToolButton>
        <ToolButton onMouseDown={() => handleTogggleClick("UNDERLINE")}>
          UND
        </ToolButton>
        <ToolButton onMouseDown={() => handleTogggleClick("STRIKETHROUGH")}>
          STR
        </ToolButton>
        <ToolButton onMouseDown={() => handleTogggleClick("ITALIC")}>
          ITA
        </ToolButton>
        <ToolButton onMouseDown={() => handleTogggleClick("BOLD")}>
          BOL
        </ToolButton>
      </TextToolbarStyle>

      <DrawToolbarStyle isOpenDrawToolbar={isOpenDrawToolbar}>
        <ToolButton
          onClick={() => {
            setIsOpenDrawToolbar(false);
            setIsOpenAllToolbar(true);
            setMode("TEXT");
          }}
        >
          BACK
        </ToolButton>
        <ToolButton
          onMouseDown={() => {
            setLineColor("red");
          }}
        >
          RED
        </ToolButton>
        <ToolButton
          onMouseDown={() => {
            setLineColor("blue");
          }}
        >
          BLUE
        </ToolButton>
      </DrawToolbarStyle>

      <StickerToolbarStyle isOpenStickerToolbar={isOpenStickerToolbar}>
        <div
          onMouseDown={() => {
            setIsOpenStickerToolbar(false);
            setIsOpenAllToolbar(true);
          }}
        >
          Back
        </div>
        <div onClick={() => addStickerButtonHandler(0)}>1번 스티커 추가</div>
        <div onClick={() => addStickerButtonHandler(1)}>2번 스티커 추가</div>
        <div onClick={() => addStickerButtonHandler(2)}>3번 스티커 추가</div>
      </StickerToolbarStyle>
    </WholeAreaWithMargin>
  );
};

export default TestAnimation;

const BackgroundStyle = styled.div`
  position: absolute;
  z-index: -10;
  background-color: #e9e9e9;
  width: 100%;
  height: 200px;
`;

const TextAreaStyle = styled.div`
  position: absolute;
  top: 120px;
  width: 100%;
  z-index: ${({ mode }) => (mode === "TEXT" ? 1 : -1)};
`;

const AllToolbarStyle = styled.div`
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  position: absolute;
  right: ${({ isOpenAllToolbar }) => (isOpenAllToolbar === true ? 0 : "-60px")};
  top: 40vh;
  background-color: #eeeeee;
  width: 70px;
  height: 200px;
  border-radius: 25px 0 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ToolButton = styled.div`
  margin: 10px;
  background-color: #bdbdbd;
`;

const TextToolbarStyle = styled.div`
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  position: absolute;
  right: ${({ isOpenTextToolbar }) =>
    isOpenTextToolbar === true ? 0 : "-80px"};
  top: 40vh;
  background-color: #cdcdcd;
  width: 70px;
  height: 200px;
  border-radius: 25px 0 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DrawToolbarStyle = styled.div`
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  position: absolute;
  right: ${({ isOpenDrawToolbar }) =>
    isOpenDrawToolbar === true ? 0 : "-80px"};
  top: 40vh;
  background-color: #cdcdcd;
  width: 70px;
  height: 200px;
  border-radius: 25px 0 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StickerToolbarStyle = styled.div`
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  position: absolute;
  bottom: 0;
  background-color: #b9b9b9;
  width: 100vw;
  height: ${({ isOpenStickerToolbar }) =>
    isOpenStickerToolbar === true ? "100px" : 0};
  border-radius: 25px 25px 0 0;
`;
