import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import OtherLogin from "./OtherLogin";
import Profile from "./Profile";
import Notification from "./Notification";
import MyPage from "./MyPage";
import Signup from "./Signup";
import SignupSuccess from "./SignupSuccess";
import Oauth from "./Oauth";
import Detail from "./Detail";
import MyFriends from "./MyFriends";
import OnBoarding from "./OnBoarding";
import MainPage from "./MainPage";
import Test from "./Test";
import TestDraft from "../components/decorations/Draft";
import BoxTest from "./BoxTest";
import NewDiary from "./NewDiary";
import NewFriend from "./NewFriend";
import DiaryDetail from "./DiaryDetail";
import AcceptTest from "./AcceptTest";
import SubPage from "./SubPage";
import Diary from "./Diary";
import TestAnimation from "./TestAnimation";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new-friend" element={<NewFriend />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/otherlogin" element={<OtherLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="test-draft" element={<TestDraft />} />
        <Route path="boxtest" element={<BoxTest />} />
        <Route path="/test-animation" element={<TestAnimation />} />
        <Route path="test/:diaryid/:paperid" element={<Test />} />
        <Route path="/oauth" element={<Oauth />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/diaries/:diaryId/:detailId" element={<Detail />} />
        <Route path="/new-diary" element={<NewDiary />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/diary-detail" element={<DiaryDetail />} />
        <Route path="/myfriends/:mode" element={<MyFriends />} />
        <Route path="/acceptTest" element={<AcceptTest />} />
        <Route path="/diaries/:diaryId" element={<SubPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
