import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Stage,
  Layer,
  Star,
  Text,
  Rect,
  Image,
  Transformer,
} from "react-konva";
import useImage from "use-image";

// <---------------변형 기능된 이미지 스티커 컴퍼넌트----------------->
const ImageSticker = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  sticker,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // 스티커 사전
  const [imgUrl0] = useImage("https://konvajs.org/assets/lion.png");
  const [imgUrl1] = useImage("https://konvajs.org/assets/yoda.jpg");
  const [imgUrl2] = useImage(
    "https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg"
  );

  const imgList = [imgUrl0, imgUrl1, imgUrl2];

  return (
    <React.Fragment>
      <Image
        image={imgList[sticker.stickerUrlNum]}
        key={sticker.id}
        id={sticker.id}
        x={sticker.x}
        y={sticker.y}
        numPoints={5}
        innerRadius={20}
        outerRadius={40}
        // fill="#89b717"
        opacity={0.8}
        draggable
        rotation={sticker.rotation}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={sticker.isDragging ? 10 : 5}
        shadowOffsetY={sticker.isDragging ? 10 : 5}
        scaleX={sticker.isDragging ? 1.2 : 1}
        scaleY={sticker.isDragging ? 1.2 : 1}
        onDragStart={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
            isDragging: true,
          });
        }}
        // onDragEnd={handleDragEnd}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
            isDragging: false,
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

// <---------------------------------------->

// 초기 스티커 값
const INITIAL_STATE = [
  {
    id: 0,
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    rotation: 30,
    isDragging: false,
    stickerUrlNum: 0,
  },
  {
    id: 1,
    x: 200,
    y: 200,
    width: 100,
    height: 100,
    rotation: 60,
    isDragging: false,
    stickerUrlNum: 1,
  },
  {
    id: 2,
    x: 300,
    y: 300,
    width: 100,
    height: 100,
    rotation: 90,
    isDragging: false,
    stickerUrlNum: 2,
  },
];

const BoxTest = () => {
  const [stickers, setStickers] = React.useState(INITIAL_STATE);

  // 변형할 것 선택 관련
  const [selectedId, selectShape] = React.useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  // 스티커 추가 관련
  const addStickerButtonHandler = (num) => {
    const newSticker = {
      id: stickers.length,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      width: 100,
      height: 100,
      rotation: 45,
      isDragging: false,
      stickerUrlNum: num,
    };
    const newStickerList = stickers.concat();
    newStickerList.push(newSticker);
    setStickers(newStickerList);
  };

  // 렌더링
  return (
    <div>
      <button onClick={() => addStickerButtonHandler(0)}>
        0번 스티커 추가
      </button>
      <button onClick={() => addStickerButtonHandler(1)}>
        1번 스티커 추가
      </button>
      <button onClick={() => addStickerButtonHandler(2)}>
        2번 스티커 추가
      </button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {stickers.map((sticker, i) => {
            return (
              <ImageSticker
                key={i}
                shapeProps={sticker}
                isSelected={sticker.id === selectedId}
                sticker={sticker}
                onSelect={() => {
                  selectShape(sticker.id);
                }}
                onChange={(newAttrs) => {
                  const sticks = stickers.slice();
                  sticks[i] = newAttrs;
                  setStickers(sticks);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default BoxTest;
