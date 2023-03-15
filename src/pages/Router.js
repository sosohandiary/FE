import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Navigationbar from "../components/Navigationbar";
import Test from "./Test";
import Diary from "./Diary";
import MainPage from "./MainPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
