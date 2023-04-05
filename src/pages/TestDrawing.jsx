import React, { useState } from "react";
import BottomSlider from "../components/test-component/BottomSlider";
import RightSideSlider from "../components/test-component/RightSideSlider";

const TestDrawing = () => {
  const [isBottomToolbar, setIsBottomToolbar] = useState(false);
  const changeModeButtonHandler = (target) => {
    if (target === "bottom") {
      setIsBottomToolbar(true);
    } else {
      setIsBottomToolbar(false);
    }
  };

  return (
    <div>
      <button onClick={() => changeModeButtonHandler("bottom")}>bottom</button>
      <button onClick={() => changeModeButtonHandler("right")}>right</button>
      {isBottomToolbar ? <BottomSlider /> : <RightSideSlider />}
    </div>
  );
};

export default TestDrawing;
