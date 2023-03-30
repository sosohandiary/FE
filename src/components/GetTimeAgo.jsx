const GetTimeAgo = ({ createdAt }) => {
  const date = new Date(createdAt);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) {
    return `${diff}초 전`;
  } else if (diff < 60 * 60) {
    const minutes = Math.floor(diff / 60);
    return `${minutes}분 전`;
  } else if (diff < 60 * 60 * 24) {
    const hours = Math.floor(diff / (60 * 60));
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diff / (60 * 60 * 24));
    return `${days}일 전`;
  }
};

export default GetTimeAgo;
