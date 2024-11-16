import React from "react";
import { useAppContext } from "../store/ContextApi";
import { Route, Routes } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import AdminAuditLogs from "./AdminAuditLogs";
import UsersList from "./UsersList";

const Admin = () => {
  const { openSideBar } = useAppContext();

  return (
    <div className="flex">
      <AdminSideBar></AdminSideBar>
      <div
        className={`transition-all overflow-hidden flex-1 duration-150 w-full min-h-[calc(100vh-74px)] ${
          openSideBar ? "lg:ml-52 ml-12" : "ml-12"
        }`}
      >
        <Routes>
          <Route path="/users" element={<UsersList />} />
          {/* <Route path="/users/:id" element={""} /> */}
          <Route path="/audit-logs" element={<AdminAuditLogs />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
