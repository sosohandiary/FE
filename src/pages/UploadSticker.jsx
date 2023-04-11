import React, { useCallback, useState } from "react";
import axios from "axios";

const UploadSticker = () => {
  const [file, setFile] = useState();

  const accessToken = window.localStorage.getItem("accessToken");

  const handleChange = (e) => {
    if (e.target.files === null) return;

    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleClick = async () => {
    if (!file) return;

    const formData = new FormData();
    await formData.append("customJson", file);

    const res = await axios
      .post(
        `${process.env.REACT_APP_BASEURL}/decoration/insert`,
        { imageURL: "formData" },
        {
          headers: {
            Authorization: accessToken,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input type={"file"} onChange={handleChange} />
      <button onClick={handleClick}>업로드 요청</button>
    </div>
  );
};

export default UploadSticker;
