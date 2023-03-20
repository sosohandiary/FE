import React from "react";
import { Stage, Layer, RegularPolygon } from "react-konva";

const Test = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <RegularPolygon
          sides={10}
          x={100}
          y={100}
          width={100}
          height={100}
          fill="red"
          shadowBlur={5}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </Layer>
    </Stage>
  );
};

export default Test;
