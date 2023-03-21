import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CgKey } from "react-icons/cg";
import { Stage, Layer, Line, Text, RegularPolygon } from "react-konva";
import { useQuery } from "react-query";

const TestKonva = () => {
  const accessToken = localStorage.getItem("accessToken");

  const A = [
    {
      tool: "pen",
      points: [
        633, 163, 633, 164, 633, 165, 633, 166, 632, 169, 630, 174, 628, 178,
        627, 182, 624, 188, 621, 194, 616, 202, 611, 212, 608, 218, 601, 229,
        596, 237, 591, 246, 582, 262, 578, 270, 573, 278, 569, 286, 560, 303,
        558, 306, 558, 307, 557, 309, 557, 309,
      ],
    },
    {
      tool: "pen",
      points: [
        637, 165, 637, 165, 638, 166, 638, 167, 640, 168, 641, 170, 642, 172,
        644, 175, 645, 177, 648, 182, 650, 186, 652, 189, 654, 193, 658, 200,
        661, 206, 665, 212, 669, 221, 680, 241, 685, 253, 691, 263, 697, 274,
        701, 282, 704, 287, 707, 291, 710, 297, 712, 301, 713, 303, 714, 305,
        715, 307, 716, 308, 716, 309, 716, 310, 716, 311, 717, 311, 717, 312,
        717, 312,
      ],
    },
    {
      tool: "pen",
      points: [
        595, 241, 595, 241, 595, 241, 596, 241, 597, 241, 599, 241, 601, 241,
        603, 241, 606, 241, 612, 241, 615, 241, 620, 241, 625, 240, 629, 240,
        634, 240, 639, 240, 645, 240, 651, 240, 656, 240, 657, 240, 662, 240,
        666, 240, 668, 240, 671, 240, 672, 240, 673, 240, 673, 240, 673, 240,
        674, 240, 674, 240,
      ],
    },
  ];

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
  const [lines, setLines] = useState(A);
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
