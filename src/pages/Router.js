import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Test from "./Test";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
