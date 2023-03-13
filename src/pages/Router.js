import { BrowserRouter, Route, Routes } from "react-router-dom";
import Knowledge from "./Knowledge";
import Notice from "./Notice";
import TransfusionBoard from "./TransfusionBoard";
import Navbar from "../components/Navbar";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/notice" element={<Notice />} />
        <Route path="/transfusion" element={<TransfusionBoard />} />
        <Route path="/knowledge" element={<Knowledge />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
