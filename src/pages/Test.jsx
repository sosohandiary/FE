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
import html2canvas from "html2canvas";

// <---------------변형 기능된 이미지 스티커 컴퍼넌트----------------->
const ImageSticker = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  sticker,
  mode,
}) => {
  // 데이터 통신
  const [imgDictList, setImgDictList] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  const { data } = useQuery(["getDecorationData"], () => {
    return axios
      .get(`${process.env.REACT_APP_BASEURL}/decoration/`, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        setImgDictList(res.data);
      })
      .catch((err) => console.log(err));
  });

  // <--------------->
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
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
  // const [imgUrl0] = useImage(imgDictList[0]?.imageURL);
  // const [imgUrl1] = useImage(imgDictList[1]?.imageURL);
  // const [imgUrl2] = useImage(imgDictList[2]?.imageURL);

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
        // fill="#89b717"
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

// 초기 스티커 값
const INITIAL_STATE = [
  {
    id: 0,
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    rotation: 30,
    isDragging: false,
    stickerUrlNum: 0,
  },
  {
    id: 1,
    x: 200,
    y: 200,
    width: 100,
    height: 100,
    rotation: 60,
    isDragging: false,
    stickerUrlNum: 1,
  },
  {
    id: 2,
    x: 300,
    y: 300,
    width: 100,
    height: 100,
    rotation: 90,
    isDragging: false,
    stickerUrlNum: 2,
  },
];

const Test = () => {
  const [mode, setMode] = useState("TEXT");
  const [lineTool, setLineTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [lineColor, setLineColor] = useState("#df4b26");
  const [lineWidth, setLineWidth] = useState(5);
  const isDrawing = useRef(false);
  const { diaryid, paperid } = useParams();

  const changeModeHandler = (target) => {
    setMode(target);
  };
  // <=== 데이터 겟 테스트===>
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/diary/${diaryid}/detail/${paperid}`,
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        console.log("CC", res.data.customJson);
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

  const Draft = () => {
    const accessToken = localStorage.getItem("accessToken");
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

    const handleTogggleClick = (e, inlineStyle) => {
      e.preventDefault();
      setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    // 저장 버튼 !!!!
    const handleSave = () => {
      const data = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      localStorage.setItem(TEXT_EDITOR_ITEM, data);
      const allData = {
        stickers,
        lines,
        texts: convertToRaw(editorState.getCurrentContent()),
      };

      console.log("보내는 데이터 : ", allData);
      const allJSON = JSON.stringify(allData);

      const sendData = { content: "", customJson: allJSON };

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

    return (
      <div className="texteditor">
        <button onMouseDown={(e) => handleTogggleClick(e, "BOLD")}>bold</button>
        <button onMouseDown={(e) => handleTogggleClick(e, "UNDERLINE")}>
          underline
        </button>
        <button onMouseDown={(e) => handleTogggleClick(e, "ITALIC")}>
          italic
        </button>
        <button onMouseDown={(e) => handleTogggleClick(e, "STRIKETHROUGH")}>
          strikthrough
        </button>
        <button
          disabled={editorState.getUndoStack().size <= 0}
          onMouseDown={() => setEditorState(EditorState.undo(editorState))}
        >
          UNDO
        </button>
        <button
          disabled={editorState.getRedoStack().size <= 0}
          onMouseDown={() => setEditorState(EditorState.redo(editorState))}
        >
          REDO
        </button>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
        <button
          className="save"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          save
        </button>
      </div>
    );
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

  //썸네일 저장
  const thumbArea = useRef(null);
  const saveThumb = () => {
    html2canvas(thumbArea.current).then((canvas) => {
      const formData = new FormData();

      formData.append("image", canvas.toDataURL());

      axios
        .post(`${process.env.REACT_APP_BASEURL}`, formData, {
          headers: { Authorization: accessToken },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
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
          <button onClick={saveThumb}>이미지로 저장</button>
        </div>
      </div>
    );
  };

  // 도화지
  return (
    <WholeAreaWithMargin>
      <Toolbar />
      <BackgroundStyle></BackgroundStyle>
      <div ref={thumbArea}>
        <TextAreaStyle mode={mode}>
          <Draft />
        </TextAreaStyle>
        <Stage
          id="testForHTML2Canvas"
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
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
      </div>
    </WholeAreaWithMargin>
  );
};

export default Test;

const BackgroundStyle = styled.div`
  position: absolute;
  z-index: -10;
  background-color: #e9e9e9;
  width: 100%;
  height: 1000px;
`;

const TextAreaStyle = styled.div`
  position: absolute;
  top: 120px;
  width: 100%;
  z-index: ${({ mode }) => (mode === "TEXT" ? 1 : -1)};
`;
