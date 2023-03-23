import React, { useRef, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import InputBox from "../components/InputBox";
import { WholeAreaWithMargin } from "../styles/WholeAreaStyle";
import { GrayButtonMedium, MintButtonSmall } from "../styles/Buttons";
import { useDropzone } from "react-dropzone";

const NewDiary = () => {
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <WholeAreaWithMargin>
      <div>다이어리 만들기</div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      <NewMember>멤버 추가</NewMember>
      <label>제목</label>
      <input type="text" />
      <label>소개</label>
      <input type="text" />
      <label>표지 설정</label>
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <GrayButtonMedium>사진으로 설정하기</GrayButtonMedium>
        </div>
      </section>
      <MintButtonSmall>생성하기</MintButtonSmall>
    </WholeAreaWithMargin>
  );
};

export default NewDiary;

const NewMember = styled.div`
  position: relative;
  left: 80px;
`;
