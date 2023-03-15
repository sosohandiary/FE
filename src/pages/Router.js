import { BrowserRouter, Route, Routes } from "react-router-dom";
import Knowledge from "./Knowledge";
import Notice from "./Notice";
import TransfusionBoard from "./TransfusionBoard";
import Navigationbar from "../components/Navigationbar";
import Search from "./Search";

const Router = () => {
  return (
    <BrowserRouter>
      <Navigationbar />
      <Routes>
        <Route path="/notice" element={<Notice />} />
        <Route path="/transfusion" element={<TransfusionBoard />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
