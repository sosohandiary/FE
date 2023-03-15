import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Navigationbar from "../components/Navigationbar";
import Profile from "./Profile";

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Navigationbar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
