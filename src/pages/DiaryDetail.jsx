import { useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { getDate } from "../utils/getDate";
import FlipBook from "../components/FlipBook";
import AlertMessage from "../components/alert/AlertMessage";
import { MdArrowBack } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { getInnerPaper, postInnerPaper } from "../api/diary";

const DiaryDetail = () => {
  const navigate = useNavigate();
  const [alertMsg, setAlertMsg] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertNavigateLink, setAlertNavigateLink] = useState("");
  const [alertReload, setAlertReload] = useState(false);

  const { diaryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  if (location.state === "needReload") {
    window.location.reload();
    window.history.replaceState({}, document.title);
  }

  const accessToken = window.localStorage.getItem("accessToken");

  //속지 조회
  const { data: dataOfInnerPaper } = useQuery(["getInnerPaper"], () =>
    getInnerPaper(accessToken, diaryId)
  );

  const { mutate } = useMutation(() => postInnerPaper(accessToken, diaryId), {
    onSuccess: () => {
      setAlertMsg("한 장이 추가되었습니다");
      setAlertOpen(true);
      setAlertReload(true);
    },
    onError: () => {
      setAlertMsg("다이어리 멤버만 작성할 수 있습니다");
      setAlertOpen(true);
    },
  });

  const goBackHandler = () => {
    navigate("/");
  };

  return (
    <>
      <Container>
        {alertOpen ? (
          <AlertMessage
            setAlertOpen={setAlertOpen}
            message={alertMsg}
            navigateLink={alertNavigateLink}
            reload={alertReload}
          />
        ) : (
          ""
        )}
        <StArrow>
          <StyledGobackButton onClick={goBackHandler} />
        </StArrow>
        <Title>다이어리 상세보기</Title>
        <div>
          <HeaderStyle>
            <DiaryTitle>{dataOfInnerPaper?.data[0].diaryTitle}</DiaryTitle>
            {dataOfInnerPaper?.data[0].createdAt &&
            getDate(dataOfInnerPaper?.data[0].createdAt) ? (
              <DiaryCreatedAt>
                {getDate(dataOfInnerPaper?.data[0].createdAt)}
              </DiaryCreatedAt>
            ) : (
              ""
            )}
          </HeaderStyle>

          {dataOfInnerPaper?.data.length === 0 ? (
            <MorePageButton onClick={mutate}>작성 시작하기</MorePageButton>
          ) : (
            <MorePageButton onClick={mutate}>페이지 추가하기</MorePageButton>
          )}

          <LabelArea>
            <div>작성을 시작해보세요!</div>
          </LabelArea>
        </div>
        <FlipStyle>
          <FlipBook data={dataOfInnerPaper?.data} diaryId={diaryId} />
        </FlipStyle>
        <InvisibleDiv></InvisibleDiv>
      </Container>
    </>
  );
};

export default DiaryDetail;

const Container = styled.div`
  margin: 0 auto;
  width: 400px;
  height: auto;
  min-height: 100vh;

  border-left: 0.0625rem solid rgb(225, 226, 228);
  border-right: 0.0625rem solid rgb(225, 226, 228);
`;

const StArrow = styled.div`
  margin: 0 auto;
  position: relative;
  left: 16px;
  top: 30px;
`;

const StyledGobackButton = styled(MdArrowBack)`
  position: absolute;
  /* padding-top: 50px; */
  font-size: 40px;
  color: #adaaaa;
  cursor: pointer;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: ${({ size }) => `${size}px`};
  color: black;
  padding-top: 30px;
  margin-bottom: 17px;
  display: flex;
  justify-content: center;
`;

const HeaderStyle = styled.div`
  display: flex;
  margin-top: 30px;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;

const DiaryTitle = styled.div`
  font-size: 28px;
`;

const DiaryCreatedAt = styled.div`
  font-size: 10px;
`;

const MorePageButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 80px auto;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 20px;
  background-color: #e1e7ff;
  width: 300px;
  height: 50px;
  cursor: pointer;
  z-index: 10;
`;

const FlipStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LabelArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c0c0c0;
  margin: -40px 0;
  width: 100%;
  height: 10px;
`;

const InvisibleDiv = styled.div``;
