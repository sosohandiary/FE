import React, { useRef, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import InputBox from "../components/InputBox";
import { WholeAreaWithMargin } from "../styles/WholeAreaStyle";
import { GrayButtonMedium, MintButtonSmall } from "../styles/Buttons";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useLocation, useNavigate } from "react-router-dom";

const NewDiary = () => {
  const navigate = useNavigate();
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
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
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
    let formData = new FormData();

    let file = acceptedFiles;
    console.log(file);

    formData.append("img", file);
    // formData.append("title", title);
    // formData.append("diaryCondition", "PUBLIC");

    const data = {
      title: "title",
      diaryCondition: "PUBLIC",
    };

    const uploadString = JSON.parse(JSON.stringify(data));

    formData.append("data", uploadString);

    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/diary`,
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // 멤버 추가 관련
  const members = [];

  const onChange = async (e) => {
    console.log("dd");
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("img", img);
    console.log(formData); // FormData {}
    for (const keyValue of formData) console.log(keyValue); // ["img", File] File은 객체
    await axios
      .post(`${process.env.REACT_APP_BASEURL}/diary`, formData, {
        headers: {
          Authorization: accessToken,
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  //모달창

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "25px",
      backgroundColor: "#959595",
    },
  };
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const sendHandler = () => {
    console.log(accessToken);
    console.log(title, desc);

    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/diary`,
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  //멤버 추가 관련
  const [memberList, setMemberList] = useState([]);

  const location = useLocation();
  if (location.state !== null) {
    setMemberList(location.state);
  }
  const goToFriendList = () => {
    navigate("/myfriends/add", { state: memberList });
  };

  return (
    <WholeAreaWithMargin>
      <div>다이어리 만들기</div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      <NewMember onClick={openModal}>멤버 추가</NewMember>
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
      <input
        type="file"
        accept="image/jpg,impge/png,image/jpeg,image/gif"
        name="profile_img"
        onChange={onChange}
      ></input>
      <button onClick={sendHandler}>전송</button>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Friend Modal"
        >
          <ModalInnerArea>
            <div>멤버추가</div>
            {memberList?.map((item) => (
              <div>user ID : {item}</div>
            ))}
            <ProfilePicLine>
              <ProfilePicInModal onClick={goToFriendList}>+</ProfilePicInModal>
              <ProfilePicInModal onClick={goToFriendList}></ProfilePicInModal>
              <ProfilePicInModal onClick={goToFriendList}></ProfilePicInModal>
              <ProfilePicInModal onClick={goToFriendList}></ProfilePicInModal>
            </ProfilePicLine>
            <ProfilePicLine>
              <ProfilePicInModal onClick={goToFriendList}></ProfilePicInModal>
              <ProfilePicInModal onClick={goToFriendList}></ProfilePicInModal>
              <ProfilePicInModal onClick={goToFriendList}></ProfilePicInModal>
              <ProfilePicInModal onClick={goToFriendList}></ProfilePicInModal>
            </ProfilePicLine>
          </ModalInnerArea>
        </Modal>
      </div>
    </WholeAreaWithMargin>
  );
};

export default NewDiary;

const NewMember = styled.div`
  position: relative;
  left: 80px;
`;

const ModalInnerArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfilePicInModal = styled.div`
  background-color: #d2d2d2;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 5px;
`;

const ProfilePicLine = styled.div`
  display: flex;
  margin: 10px;
`;
