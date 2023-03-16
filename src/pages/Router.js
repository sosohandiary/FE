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
        <Route path="/oauth" element={<Oauth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
