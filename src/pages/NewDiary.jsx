import React, { useRef, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import InputBox from "../components/InputBox";
import { WholeAreaWithMargin } from "../styles/WholeAreaStyle";
import { GrayButtonMedium, MintButtonSmall } from "../styles/Buttons";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const NewDiary = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 15,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 0,
    boxSizing: "border-box",
  };

  const img = {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 15,
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
      <img
        src={file.preview}
        style={img}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const createDiaryCover = () => {
    console.log(title, desc);
    console.log(files);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: accessToken,
      },
    };
    let fd = new FormData();
    fd.append("title", title);
    fd.append("");
    fd.append("image", files[0]);
    axios
      .post(`${process.env.REACT_APP_BASEURL}`, { title, desc }, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // 멤버 추가 관련
  const members = [];

  return (
    <WholeAreaWithMargin>
      <div>다이어리 만들기</div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      <NewMember>멤버 추가</NewMember>
      <label>제목</label>
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <label>소개</label>
      <input
        type="text"
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      />
      <label>표지 설정</label>
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <GrayButtonMedium>사진으로 설정하기</GrayButtonMedium>
        </div>
      </section>
      <MintButtonSmall onClick={createDiaryCover}>생성하기</MintButtonSmall>
    </WholeAreaWithMargin>
  );
};

export default NewDiary;

const NewMember = styled.div`
  position: relative;
  left: 80px;
`;
