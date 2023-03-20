import React, { useEffect } from "react";
import { Stage, Layer, Line, Text, RegularPolygon } from "react-konva";

const TestKonva = () => {
  // 드래그하면 오버스크롤되는 이벤트 방지
  useEffect(() => {
    document.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
  }, []);

  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
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

  const test = (target) => {
    console.log(target);
  };

  return (
    <div style={{ position: "fixed" }}>
      <div style={{ border: "1px solid black" }}>dd</div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          <Text
            fontSize={60}
            text="HEYYYYYYYYYYYYYYYYYYYYYYY"
            wrap="char"
            align="center"
            width={700}
          />
          <RegularPolygon
            sides={10}
            x={100}
            y={100}
            width={100}
            height={100}
            fill="red"
            shadowBlur={5}
            draggable
          />
          <Text text="Just start drawing" x={5} y={30} />
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
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </div>
  );
};

export default TestKonva;
