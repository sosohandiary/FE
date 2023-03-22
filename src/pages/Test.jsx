import { Textarea, css } from "@nextui-org/react";
import { useRef, useState } from "react";
import styled from "styled-components";
import { WholeAreaWithMargin } from "../styles/WholeAreaStyle";
import { Stage, Layer, Star, Text, Line } from "react-konva";
import TestDraft from "./TestDraft";
import Draggable from "react-draggable";

const Test = () => {
  const [mode, setMode] = useState("TEXT");
  const [lineTool, setLineTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [lineColor, setLineColor] = useState("#df4b26");
  const [lineWidth, setLineWidth] = useState(5);
  const isDrawing = useRef(false);
  const changeModeHandler = (target) => {
    setMode(target);
  };

  // <-------------- 스티커 관련 -------------->
  function generateShapes() {
    return [...Array(5)].map((_, i) => ({
      id: i.toString(),
      shape: "star",
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: Math.random() * 180,
      isDragging: false,
    }));
  }

  const INITIAL_STATE = generateShapes();

  const [stars, setStars] = useState(INITIAL_STATE);

  const [stickers, setStickers] = useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setStickers(
      stickers.map((sticker) => {
        return {
          ...sticker,
          isDragging: sticker.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setStickers(
      stickers.map((sticker) => {
        return {
          ...sticker,
          isDragging: false,
        };
      })
    );
  };

  // <-------------- 그리기 관련 -------------->
  const handleMouseDown = (e) => {
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

  const changeColorHandler = (target) => {
    setLineColor(target);
  };
  const changeWidthHandler = (target) => {
    setLineWidth(target);
  };
  const changeLineTool = (target) => {
    setLineTool(target);
  };

  const addStickerHandler = () => {};

  //도구 모음 창
  const Toolbar = () => {
    return (
      <div style={{ position: "sticky", zIndex: 10 }}>
        <button onClick={() => changeModeHandler("TEXT")}>텍스트 모드</button>
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
          <div>
            별
            <Draggable>
              <button onClick={() => addStickerHandler()}>큰 별 추가</button>
            </Draggable>
            <button onClick={() => addStickerHandler()}>작은 별 추가</button>
          </div>
          <div>
            원<button onClick={() => addStickerHandler()}>큰 원 추가</button>
            <button onClick={() => addStickerHandler()}>작은 원 추가</button>
          </div>
        </div>
      </div>
    );
  };

  console.log(stickers);
  // 도화지
  return (
    <WholeAreaWithMargin>
      <Toolbar />
      <BackgroundStyle></BackgroundStyle>
      <TextAreaStyle mode={mode}>
        <TestDraft />
        {/* <Textarea
          label="Soda Diary"
          placeholder="Static rows, rows (4)"
          rows={30}
          width="100%"
          readOnly={mode !== "TEXT" ? true : false}
          style={{
            fontSize: "16px",
          }}
          css={{ $$inputColor: "rgba(0,0,0,0)" }}
        /> */}
      </TextAreaStyle>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        style={{ position: "absolute" }}
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
          {stickers.map((sticker) => {
            return (
              <Star
                key={sticker.id}
                id={sticker.id}
                x={sticker.x}
                y={sticker.y}
                numPoints={5}
                innerRadius={20}
                outerRadius={40}
                fill="#89b717"
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
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            );
          })}
        </Layer>
      </Stage>
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

// {api: {배경지},

// {0:"url",1:"url2",3:"url3"},

// {그림 좌표,},
// {텍스트 좌표,},
// {스티커 좌표,},
// }

// 다합치기
