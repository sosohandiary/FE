import React, { useRef } from "react";
import html2canvas from "html2canvas";

function TestAnimation() {
  const myRef = useRef(null);

  const handleScreenshotClick = () => {
    html2canvas(myRef.current).then((canvas) => {
      console.log(canvas);
      const dataURL = canvas.toDataURL();

      // Set the src attribute of an image tag to the data URL
      const img = document.createElement("img");
      img.src = dataURL;
      // Do something with the canvas, like displaying it in an image tag or sending it to a server
    });
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      <div ref={myRef}>
        <p>This is the content that will be captured in the screenshot</p>
      </div>
      <button onClick={handleScreenshotClick}>Take Screenshot</button>
    </div>
  );
}

export default TestAnimation;
