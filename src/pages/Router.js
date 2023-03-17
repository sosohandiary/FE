import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Search from "./Search";
import Test from "./Test";
import Diary from "./Diary";
import MainPage from "./MainPage";
import OtherLogin from "./OtherLogin";
import Profile from "./Profile";
import Signup from "./Signup";
import Oauth from "./Oauth";
import SignupSuccess from "./SignupSuccess";
import Notification from "./Notification";
import MyPage from "./MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otherlogin" element={<OtherLogin />} />
        <Route path="/test" element={<Test />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/success" element={<SignupSuccess />} />
        <Route path="/oauth" element={<Oauth />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
