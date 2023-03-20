import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Search from "./Search";
import Test from "./Test";
import Diary from "./Diary";
import MainPage from "./MainPage";
import OtherLogin from "./OtherLogin";
import Profile from "./Profile";
import Notification from "./Notification";
import MyPage from "./MyPage";
import Signup from "./Signup";
import SignupSuccess from "./SignupSuccess";
import FriendsList from "./FriendsList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/diaries" element={<Diary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/otherlogin" element={<OtherLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/friends-list" element={<FriendsList/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
