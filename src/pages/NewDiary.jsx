import React, { useState, useCallback } from "react";
import axios from "axios";

const NewDiary = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  const [file, setFile] = useState();

  const handleChange = useCallback((e) => {
    if (e.target.files === null) return;

    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }, []);

  const handleClick = useCallback(async () => {
    if (!file) return;

    const formData = new FormData();
    console.log(file);
    await formData.append("img", file);

    const data = { title: "huewilliams", diaryCondition: "PUBLIC" };
    // await formData.append("uploader", JSON.stringify(uploader));

    // for spring server
    await formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    const res = await axios.post(
      `${process.env.REACT_APP_BASEURL}/diary`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      }
    );
    console.log(res);
    if (res.status === 201) console.log(res.data);
  }, [file]);

  return (
    <div>
      <input type={"file"} onChange={handleChange} />
      <button onClick={handleClick}>업로드 요청</button>
    </div>
  );
};

export default NewDiary;
