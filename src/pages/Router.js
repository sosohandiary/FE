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
import OnBoarding from "./OnBoarding";
import MainPage from "./MainPage";
import Test from "./Test";
import TestDraft from "../components/decorations/Draft";
import BoxTest from "./BoxTest";
import NewDiary from "./NewDiary";
import NewFriend from "./NewFriend";
import TestCrop from "./TestCrop";

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
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="test-draft" element={<TestDraft />} />
        <Route path="boxtest" element={<BoxTest />} />
        <Route path="/test-crop" element={<TestCrop />} />
        <Route path="test" element={<Test />} />
        <Route path="/oauth" element={<Oauth />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/new-diary" element={<NewDiary />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
