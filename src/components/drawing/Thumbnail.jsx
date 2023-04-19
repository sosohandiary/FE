import { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Stage, Layer, Line, Image } from "react-konva";
import useImage from "use-image";
import axios from "axios";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import "react-tooltip/dist/react-tooltip.css";
import { useQuery, useQueryClient } from "react-query";
import { getInnerPaper, getThumbnail } from "../../api/diary";

// <---------------스티커 크기 조절----------------->
const ImageSticker = ({ shapeProps, isSelected, sticker }) => {
  // <--------------->
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // 스티커 사전

  const [imgUrl0] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1404.png"
  );
  const [imgUrl1] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1405.png"
  );
  const [imgUrl2] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1406.png"
  );
  const [imgUrl3] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1407.png"
  );
  const [imgUrl4] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1408.png"
  );
  const [imgUrl5] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1409.png"
  );
  const [imgUrl6] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1410.png"
  );
  const [imgUrl7] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1411.png"
  );
  const [imgUrl8] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1412.png"
  );
  const [imgUrl9] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1413.png"
  );
  const [imgUrl10] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1414.png"
  );
  const [imgUrl11] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1415.png"
  );
  const [imgUrl12] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1416.png"
  );
  const [imgUrl13] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1417.png"
  );
  const [imgUrl14] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1418.png"
  );
  const [imgUrl15] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1419.png"
  );
  const [imgUrl16] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1420.png"
  );
  const [imgUrl17] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1421.png"
  );
  const [imgUrl18] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1422.png"
  );
  const [imgUrl19] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1423.png"
  );
  const [imgUrl20] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1424.png"
  );
  const [imgUrl21] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1425.png"
  );
  const [imgUrl22] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1426.png"
  );
  const [imgUrl23] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1427.png"
  );
  const [imgUrl24] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1428.png"
  );
  const [imgUrl25] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1429.png"
  );
  const [imgUrl26] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1430.png"
  );
  const [imgUrl27] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Union-1.png"
  );
  const [imgUrl28] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Union.png"
  );

  const imgList = [
    imgUrl0,
    imgUrl1,
    imgUrl2,
    imgUrl3,
    imgUrl4,
    imgUrl5,
    imgUrl6,
    imgUrl7,
    imgUrl8,
    imgUrl9,
    imgUrl10,
    imgUrl11,
    imgUrl12,
    imgUrl13,
    imgUrl14,
    imgUrl15,
    imgUrl16,
    imgUrl17,
    imgUrl18,
    imgUrl19,
    imgUrl20,
    imgUrl21,
    imgUrl22,
    imgUrl23,
    imgUrl24,
    imgUrl25,
    imgUrl26,
    imgUrl27,
    imgUrl28,
  ];

  return (
    <Fragment>
      <Image
        image={imgList[sticker.stickerUrlNum]}
        key={sticker.id}
        id={sticker.id}
        x={sticker.x}
        y={sticker.y}
        numPoints={5}
        innerRadius={20}
        outerRadius={40}
        opacity={0.8}
        rotation={sticker.rotation}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={sticker.isDragging ? 10 : 5}
        shadowOffsetY={sticker.isDragging ? 10 : 5}
        scaleX={sticker.isDragging ? 1.2 : 1}
        scaleY={sticker.isDragging ? 1.2 : 1}
        ref={shapeRef}
        {...shapeProps}
      />
    </Fragment>
  );
};

// <---------------------------------------->

const Thumbnail = ({ diaryId, paperId }) => {
  const queryClient = useQueryClient();
  const [lines, setLines] = useState([]);
  const [stickers, setStickers] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isNewPage, setIsNewPage] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  // 드래그 시  스크롤 방지
  useEffect(() => {
    function preventBehavior(e) {
      e.preventDefault();
    }
    document.addEventListener("touchmove", preventBehavior, { passive: false });
  }, []);

  // <=== 데이터 겟===>
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail/${paperId}`,
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        if (res.data?.customJson.length > 10) {
          const resJson = JSON.parse(res.data?.customJson);
          setStickers(resJson.stickers);
          setLines(resJson.lines);
          setEditorState(
            EditorState.createWithContent(convertFromRaw(resJson.texts))
          );
        } else {
          setIsNewPage(true);
        }
      });
  }, []);

  // 건들지 않은 새로운 페이지일때
  if (isNewPage) {
    return <NewPageMsgArea>새로운 페이지입니다.</NewPageMsgArea>;
  }

  // 도화지
  return (
    <div>
      <StageStyle>
        <Stage
          width={375}
          height={600}
          style={{ position: "absolute", top: "0px", zIndex: "1" }}
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
            {stickers.map((sticker, i) => {
              return (
                <ImageSticker key={i} shapeProps={sticker} sticker={sticker} />
              );
            })}
          </Layer>
        </Stage>
      </StageStyle>
      <EditorStyle>
        <Editor editorState={editorState} />
      </EditorStyle>
    </div>
  );
};

export default Thumbnail;

const NewPageMsgArea = styled.div`
  display: flex;
  justify-content: center;
  margin: 200px 0;
`;

const EditorStyle = styled.div`
  .DraftEditor-editorContainer {
    max-height: 600px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      background-color: transparent;
    }
  }
  font-size: 20px;
  position: relative;
  top: 0px;
  width: 390px;
  height: 560px;
  z-index: ${({ mode }) => (mode === "TEXT" ? 1 : -1)};
  border-radius: 25px;
  background-color: rgba(200, 200, 200, 0);
`;

const StageStyle = styled.div`
  position: relative;
  top: -40px;
  left: -0px;
`;
