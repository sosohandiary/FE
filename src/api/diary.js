import axios from "axios";

export const postNewDiary = (accessToken, formData) => {
  return axios.post(`${process.env.REACT_APP_BASEURL}/diary`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: accessToken,
    },
  });
};

export const getInnerPaper = (accessToken, diaryId) => {
  return axios.get(`${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail`, {
    headers: { Authorization: accessToken },
  });
};

export const postInnerPaper = (accessToken, diaryId) => {
  return axios.post(
    `${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail`,
    {
      customJson: "",
      content: "",
    },
    {
      headers: { Authorization: accessToken },
    }
  );
};

export const getThumbnail = (accessToken, diaryId, paperId) => {
  return axios.get(
    `${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail/${paperId}`,
    {
      headers: { Authorization: accessToken },
    }
  );
};

export const patchDrawing = (accessToken, diaryId, paperid, drawingData) => {
  return axios.patch(
    `${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail/${paperid}`,
    drawingData,
    {
      headers: { Authorization: accessToken },
    }
  );
};
