import React from "react";
import Navigationbar from "../../components/Navigationbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <Navigationbar />
    </>
  );
};

export default MainLayout;
