import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Search from "./Search";
import OtherLogin from "./OtherLogin";
import Profile from "./Profile";
import Notification from "./Notification";
import MyPage from "./MyPage";
import Signup from "./Signup";
import SignupSuccess from "./SignupSuccess";
import TestKonva from "./TestKonva";
import Oauth from "./Oauth";
import Detail from "./Detail";
import MyFriends from "./MyFriends";
import OnBoarding from "./OnBoarding";
import MainPage from "./MainPage";
import Test from "./Test";
import TestDraft from "./TestDraft";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/otherlogin" element={<OtherLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="test-konva" element={<TestKonva />} />
        <Route path="test-draft" element={<TestDraft />} />
        <Route path="test" element={<Test />} />
        <Route path="/oauth" element={<Oauth />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/myfriends" element={<MyFriends />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
