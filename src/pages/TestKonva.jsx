import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line, Text, RegularPolygon } from "react-konva";

const TestKonva = () => {
  const accessToken = localStorage.getItem("accessToken");

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

  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#df4b26");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [lines, setLines] = useState([]);
  const [data, setData] = useState(null);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, color, strokeWidth, points: [pos.x, pos.y] }]);
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

  const onSaveButtonHandler = () => {
    const jsonifiedData = lines;
    axios
      .post(`${process.env.REACT_APP_BASEURL}/test/insert`, jsonifiedData, {
        headers: { Authorization: accessToken },
      })
      .then((res) => console.log(res));
    console.log(jsonifiedData);
    console.log(lines);
  };

  const changeColor = (color) => {
    setColor(color);
  };
  const changeStrokeWidth = (width) => {
    setStrokeWidth(width);
  };

  // const { data } = useQuery(["getDrawings"], () => {
  //   return axios.get(`${process.env.REACT_APP_BASEURL}/test/insert/{id}`);
  // });
  // console.log(data);

  useEffect(() => {
    console.log(accessToken);
    const dataTTT = axios
      .get(`${process.env.REACT_APP_BASEURL}/test/insert/3`, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        console.log(res.data.customJson);
        const a = JSON.parse(res.data.customJson);
        setData(a);
        console.log(a);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ position: "fixed" }}>
      <div style={{ border: "1px solid black" }}>
        <button onClick={onSaveButtonHandler}>저장</button>
        <button onClick={() => changeColor("#df4b26")}>RED</button>
        <button onClick={() => changeColor("#2657df")}>BLUE</button>
        <button onClick={() => changeStrokeWidth(5)}>두껍게</button>
        <button onClick={() => changeStrokeWidth(1)}>얇게</button>
      </div>
      <div style={{ position: "absolute" }}>
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
                stroke={line.color}
                strokeWidth={line.strokeWidth}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
            {/* {data?.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.strokeWidth}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))} */}
          </Layer>
        </Stage>
      </div>
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
