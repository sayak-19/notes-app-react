import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { use } from "framer-motion/client";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const getToken = localStorage.getItem("JWT")
    ? JSON.stringify(localStorage.getItem("JWT"))
    : null;
  const is_Admin = localStorage.getItem("IS_ADMIN")
    ? JSON.stringify(localStorage.getItem("IS_ADMIN"))
    : false;

  const [isAdmin, setIsAdmin] = useState(is_Admin);
  const [token, setToken] = useState(getToken);
  const [currentUser, setCurrentUser] = useState(null);
  const [openSideBar, setOpenSideBar] = useState(true);

  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("USER"));

    if (user?.username) {
      try {
        const { data } = await api.get(`/auth/user`);
        const roles = data.roles;

        if (roles.includes("ROLE_ADMIN")) {
          setIsAdmin(true);
          localStorage.setItem("IS_ADMIN", JSON.stringify(true));
        } else {
          localStorage.removeItem("IS_ADMIN");
          setIsAdmin(false);
        }
        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching current user", error);
        toast.error("Error fetching current user");
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <ContextApi.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        isAdmin,
        setIsAdmin,
        openSideBar,
        setOpenSideBar,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(ContextApi);
  return context;
};
