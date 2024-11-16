import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "./store/ContextApi";

function NavBar() {
  const [headerToggle, setHeaderToggle] = useState(false);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const { token, setToken, setCurrentUser, isAdmin, setIsAdmin } =
    useAppContext();

  const handleLogout = () => {
    localStorage.removeItem("JWT");
    //localStorage.removeItem("CSRF");
    localStorage.removeItem("USER");
    localStorage.removeItem("IS_ADMIN");
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <header className="h-headerHeight z-50 text-textColor bg-headerColor shadow-sm flex items-center sticky top-0">
      <nav className="sm:px-10 px-4 flex w-full h-full items-center justify-between">
        <Link to="/">
          <h3 className="font-dancingScript text-logoText">Secure Notes</h3>
        </Link>
        <ul
          className={`lg:static absolute left-0 top-16 w-full lg:w-fit lg:px-0 sm:px-10 px-4  lg:bg-transparent bg-headerColor ${
            headerToggle
              ? "min-h-fit max-h-navbarHeight lg:py-0 py-4 shadow-md shadow-slate-700 lg:shadow-none"
              : "h-0 overflow-hidden"
          } lg:h-auto transition-all duration-100 font-montserrat text-textColor flex lg:flex-row flex-col lg:gap-8 gap-2`}
        >
          {token && (
            <>
              <Link to="/notes">
                <li
                  className={` ${
                    pathName === "/notes" ? "font-semibold " : ""
                  } py-2 cursor-pointer  hover:text-slate-300 `}
                >
                  My Notes
                </li>
              </Link>
              <Link to="/create-note">
                <li
                  className={` py-2 cursor-pointer  hover:text-slate-300 ${
                    pathName === "/create-note" ? "font-semibold " : ""
                  } `}
                >
                  Create Note
                </li>
              </Link>
              {isAdmin && (
                <Link to="/admin">
                  <li
                    className={` py-2 cursor-pointer  hover:text-slate-300 ${
                      pathName === "/admin" ? "font-semibold " : ""
                    } `}
                  >
                    Admin
                  </li>
                </Link>
              )}
            </>
          )}
          <Link to="/contacts">
            <li
              className={`${
                pathName === "/contact" ? "font-semibold " : ""
              } py-2 cursor-pointer hover:text-slate-300`}
            >
              Contact
            </li>
          </Link>
          <Link to="/about">
            <li
              className={`py-2 cursor-pointer hover:text-slate-300 ${
                pathName === "/about" ? "font-semibold " : ""
              }`}
            >
              About
            </li>
          </Link>
          {token && (
            <button
              onClick={handleLogout}
              className="w-24 text-center bg-customRed font-semibold px-4 py-2 rounded-sm cursor-pointer hover:text-slate-300"
            >
              LogOut
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
