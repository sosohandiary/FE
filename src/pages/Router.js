import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Search from "./Search";
import Test from "./Test";
import Diary from "./Diary";
import MainPage from "./MainPage";
import OtherLogin from "./OtherLogin";
import Profile from "./Profile";
import Notification from "./Notification";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/notice" element={<Notice />} /> */}
        {/* <Route path="/transfusion" element={<TransfusionBoard />} /> */}
        {/* <Route path="/knowledge" element={<Knowledge />} /> */}
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otherlogin" element={<OtherLogin />} />
        <Route path="/test" element={<Test />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notification" element={<Notification />} />
<<<<<<< HEAD
        <Route path="/mypage" element={<MyPage />} />
        {/* <Route path="/detail" element={<Detail />} /> */}
=======
>>>>>>> 8483e729ca2d5415a3d8918121eec585076ba497
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
