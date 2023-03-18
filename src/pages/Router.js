import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import UserSearch from "./UserSearch";
import Test from "./Test";
import MainPage from "./MainPage";
import OtherLogin from "./OtherLogin";
import Profile from "./Profile";
import Signup from "./Signup";
import Oauth from "./Oauth";
import SignupSuccess from "./SignupSuccess";
import Notification from "./Notification";
import MyPage from "./MyPage";
import TestKonva from "./TestKonva";
import Diaries from "./Diaries";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user-search" element={<UserSearch />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/diaries" element={<Diaries />} />
        <Route path="/login" element={<Login />} />
        <Route path="/other-login" element={<OtherLogin />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test-konva" element={<TestKonva />} />
        <Route path="/profiles" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/oauth" element={<Oauth />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
