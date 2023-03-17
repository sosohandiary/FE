import React from "react";
import Draggable, { DraggableCore } from "react-draggable";

const Test = () => {
  const eventLogger = (e, data) => {
    console.log("Event: ", e);
    console.log("Data: ", data);
  };

  const onStartHandler = () => {
    console.log("onStart");
  };

  return (
    <div>
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        scale={1}
        onStart={onStartHandler}
        onDrag={console.log("onDrag")}
        onStop={console.log("onStop")}
      >
        <div className="handle">
          <div>Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
    </div>
  );
};

export default Test;
