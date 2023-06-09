import { useState } from "react";

function Spinner() {
  const [animation, setAnimation] = useState(true);

  return (
    <div className="loadingio-spinner-ellipsis-1qunzv9bz5n">
      {/* <WholeViewWidth> */}
      <div className="ldio-fw642d00l8">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style type="text/css">
        {`
        @keyframes ldio-fw642d00l8 {
          0% { transform: translate(12.600000000000001px,84px) scale(0); }
          25% { transform: translate(12.600000000000001px,84px) scale(0); }
          50% { transform: translate(12.600000000000001px,84px) scale(1); }
          75% { transform: translate(84px,84px) scale(1); }
          100% { transform: translate(155.4px,84px) scale(1); }
        }
        @keyframes ldio-fw642d00l8-r {
          0% { transform: translate(155.4px,84px) scale(1); }
          100% { transform: translate(155.4px,84px) scale(0); }
        }
        @keyframes ldio-fw642d00l8-c {
          0% { background: #fff4d2 }
          25% { background: #ecf2ff }
          50% { background: #e3dffd }
          75% { background: #e5d1fa }
          100% { background: #fff4d2 }
        }
        .ldio-fw642d00l8 div {
          position: absolute;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          transform: translate(84px,84px) scale(1);
          background: #fff4d2;
          animation: ldio-fw642d00l8 3.571428571428571s infinite cubic-bezier(0,0.5,0.5,1);
        }
        .ldio-fw642d00l8 div:nth-child(1) {
          background: #e5d1fa;
          transform: translate(155.4px,84px) scale(1);
          animation: ldio-fw642d00l8-r 0.8928571428571428s infinite cubic-bezier(0,0.5,0.5,1), ldio-fw642d00l8-c 3.571428571428571s infinite step-start;
        }
        .ldio-fw642d00l8 div:nth-child(2) {
          animation-delay: -0.8928571428571428s;
          background: #fff4d2;
        }
        .ldio-fw642d00l8 div:nth-child(3) {
          animation-delay: -1.7857142857142856s;
          background: #e5d1fa;
        }
        .ldio-fw642d00l8 div:nth-child(4) {
          animation-delay: -2.6785714285714284s;
          background: #e3dffd;
        }
        .ldio-fw642d00l8 div:nth-child(5) {
          animation-delay: -3.571428571428571s;
          background: #ecf2ff;
        }
        .loadingio-spinner-ellipsis-1qunzv9bz5n {
          width: 210px;
          height: 210px;
          display: inline-block;
          overflow: hidden;
          background: none;
        }
        .ldio-fw642d00l8 {
          width: 100%;
          height: 100%;
          position: relative;
          transform: translateZ(0) scale(1);
          backface-visibility: hidden;
          transform-origin: 0 0; /* see note above */
        }
        .ldio-fw642d00l8 div {
          box-sizing: content-box;
        }
      `}
      </style>
      {/* </WholeViewWidth> */}
    </div>
  );
}

export default Spinner;
