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

const DecorationBoard = ({ customJson }) => {
  const [mode, setMode] = useState("TEXT");
  const [lineTool, setLineTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [lineColor, setLineColor] = useState("#df4b26");
  const [lineWidth, setLineWidth] = useState(5);
  const isDrawing = useRef(false);

  const changeModeHandler = (target) => {
    setMode(target);
  };
  // <=== 데이터 겟 테스트===>
  const accessToken = localStorage.getItem("accessToken");

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

    return (
      <div className="texteditor">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    );
  };

  // 백엔드에서 겟 해오기

  const json = customJson.length < 20 ? "" : JSON.parse(customJson);

  if (json) {
    const stickersReadOnly = json.stickers;
    const linesReadOnly = json.lines;
    const textsReadOnly = json.texts;
  }

  // 도화지
  return (
    <WholeAreaWithMargin>
      <BackgroundStyle></BackgroundStyle>
      <TextAreaStyle mode={mode}>
        <Draft />
      </TextAreaStyle>
      <Stage
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
    </WholeAreaWithMargin>
  );
};

export default DecorationBoard;

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
