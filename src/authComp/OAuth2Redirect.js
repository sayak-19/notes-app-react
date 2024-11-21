import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../store/ContextApi";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const OAuth2Redirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setIsAdmin } = useAppContext();

  useEffect(() => {
    const param = new URLSearchParams(location.search);
    console.log("param = ", param.toString());
    const token = param.get("token");

    if (token) {
      try {
        const jwtToken = jwtDecode(token);
        localStorage.setItem("JWT", jwtToken);

        const user = {
          username: jwtToken?.sub,
          roles: jwtToken.roles ? jwtToken.roles.split(",") : [],
        };
        localStorage.setItem("USER", JSON.stringify(user));

        setToken(token);
        setIsAdmin(user.roles.includes("ADMIN"));

        setTimeout(() => {
          console.log("Navigating to /notes");
          navigate("/notes");
        }, 100); // 100ms delay
      } catch (err) {
        toast.error("Token decoding failed ", err);
        console.error("Token decoding failed ", err);
        navigate("/login");
      }
    } else {
      toast.error("Token not found in URL, redirecting to login");
      console.log("Token not found in URL, redirecting to login");
      navigate("/login");
    }
  }, [location, navigate, setToken, setIsAdmin]);

  return <div>Redirecting...</div>;
};

export default OAuth2Redirect;
