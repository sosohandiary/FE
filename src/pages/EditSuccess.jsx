import React, { useCallback, useState } from "react";
import axios from "axios";

function DiaryEdit() {
  const [file, setFile] = useState(null);
  const accessToken = window.localStorage.getItem("accessToken");

  const handleChange = useCallback((e) => {
    if (e.target.files === null) return;

    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }, []);

  const handleClick = useCallback(async () => {
    if (!file) return;

    const formData = new FormData();
    await formData.append("img", file);
    const uploader = { title: "huewilliams" };
    // await formData.append("uploader", JSON.stringify(uploader));

    // for spring server
    await formData.append(
      "title",
      new Blob([JSON.stringify(uploader)], { type: "application/json" })
    );

    console.log(...formData);

    const res = await axios.patch(
      `${process.env.REACT_APP_BASEURL}/diary/42`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      }
    );
    if (res.status === 201) console.log(res.data);
  }, [file]);

  return (
    <div>
      <input type={"file"} onChange={handleChange} />
      <button onClick={handleClick}>업로드 요청</button>
    </div>
  );
}

export default DiaryEdit;
