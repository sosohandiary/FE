import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Navigationbar from "../components/Navigationbar";
import Test from "./Test";
import Diary from "./Diary";
import MainPage from "./MainPage";
import OtherLogin from "./OtherLogin";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otherlogin" element={<OtherLogin />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
