import React from "react";
import { useAppContext } from "../store/ContextApi";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaUser } from "react-icons/fa";
import { LiaBlogSolid } from "react-icons/lia";
import Tooltip from "@mui/material/Tooltip";

const AdminSideBar = () => {
  const { openSideBar, setOpenSideBar } = useAppContext();
  const path = useLocation().pathname;
  return (
    <div
      className={`fixed p-2 top-[74px] min-h-[calc(100vh-74px)] max-h-[calc(100vh-74px)]  z-20  left-0 bg-headerColor ${
        openSideBar ? "w-52" : "w-12"
      } transition-all duration-150  `}
    >
      <div className="min-h-10 max-h-10 flex flex-end">
        {openSideBar ? (
          <button
            className="flex w-full text-white justify-end items-center gap-1"
            onClick={() => setOpenSideBar(!openSideBar)}
          >
            <span>
              <FaArrowLeft className="text-sm" />
            </span>
            <span className="font-semibold">Close</span>
          </button>
        ) : (
          <Tooltip title="Click To Expand">
            <button
              className="flex w-full text-white justify-center items-center gap-1"
              onClick={() => setOpenSideBar(!openSideBar)}
            >
              <span>
                <FaArrowRight className="text-lg" />
              </span>
            </button>
          </Tooltip>
        )}
      </div>
      <div className="flex flex-col gap-5 mt-4">
        <Tooltip title={openSideBar ? "" : "All Users"}>
          <Link
            to="/admin/users"
            className={`flex text-white items-center gap-2 min-h-10 max-h-10 py-2 px-2 rounded-md hover:bg-btnColor ${
              path.startsWith("/admin/users") ? "bg-btnColor" : "bg-transparent"
            }`}
          >
            <span>
              <FaUser />
            </span>
            <span
              className={`${
                !openSideBar ? "opacity-0" : ""
              } transition-all font-semibold duration-150 ease-in-out`}
            >
              All Users
            </span>
          </Link>
        </Tooltip>
        <Tooltip title={openSideBar ? "" : "Audit Logs"}>
          <Link
            to="/admin/audit-logs"
            className={`flex text-white items-center gap-2 ${
              path.startsWith("/admin/audit-logs")
                ? "bg-btnColor"
                : "bg-transparent"
            }   min-h-10 max-h-10 py-2 px-2 rounded-md hover:bg-btnColor`}
          >
            <span>
              <LiaBlogSolid className="text-xl" />
            </span>
            <span
              className={` ${
                !openSideBar ? "opacity-0" : ""
              } transition-all font-semibold duration-150  ease-in-out`}
            >
              Audit Logs
            </span>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default AdminSideBar;
