import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Navigationbar from "../components/Navigationbar";

const Router = () => {
  return (
    <BrowserRouter>
      <Navigationbar />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
