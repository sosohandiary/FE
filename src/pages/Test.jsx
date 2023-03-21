import { Textarea } from "@nextui-org/react";
import { useRef, useState } from "react";
import styled from "styled-components";
import { WholeAreaWithMargin } from "../styles/WholeAreaStyle";
import { Stage, Layer, Star, Text, Line } from "react-konva";

const Test = () => {
  const [mode, setMode] = useState("TEXT");
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const changeModeHandler = (target) => {
    setMode(target);
  };

  function generateShapes() {
    return [...Array(10)].map((_, i) => ({
      id: i.toString(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: Math.random() * 180,
      isDragging: false,
    }));
  }

  const INITIAL_STATE = generateShapes();

  const [stars, setStars] = useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      })
    );
  };

  const handleMouseDown = (e) => {
    if (mode === "DRAW") {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
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

  const Toolbar = () => {
    return (
      <div>
        <button onClick={() => changeModeHandler("TEXT")}>텍스트 모드</button>
        <button onClick={() => changeModeHandler("DRAW")}>그리기 모드</button>
        <button onClick={() => changeModeHandler("STICKER")}>
          스티커 모드
        </button>
      </div>
    );
  };

  return (
    <WholeAreaWithMargin>
      <Toolbar />
      <Style>
        <Textarea
          placeholder="Static rows, rows (4)"
          rows={30}
          width="100%"
          readOnly={mode !== "TEXT" ? true : false}
          style={{ fontSize: "16px" }}
        />
      </Style>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ position: "absolute" }}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {stars.map((star) => (
            <Star
              key={star.id}
              id={star.id}
              x={star.x}
              y={star.y}
              numPoints={5}
              innerRadius={20}
              outerRadius={40}
              fill="#89b717"
              opacity={0.8}
              draggable={mode === "STICKER" ? true : false}
              rotation={star.rotation}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              shadowOffsetX={star.isDragging ? 10 : 5}
              shadowOffsetY={star.isDragging ? 10 : 5}
              scaleX={star.isDragging ? 1.2 : 1}
              scaleY={star.isDragging ? 1.2 : 1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </WholeAreaWithMargin>
  );
};

export default Test;

const Style = styled.div`
  width: 100%;
`;
