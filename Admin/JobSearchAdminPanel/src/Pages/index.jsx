import React from "react";
import Header from "../Layouts/Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AdminLayout;
