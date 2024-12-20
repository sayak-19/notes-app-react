import React, { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAppContext } from "../store/ContextApi";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../utils/InputField";
import Button from "../utils/Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Divider } from "@mui/material";

const apiUrl = process.env.REACT_APP_API_URL;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const navigate = useNavigate();

  const { token, setToken } = useAppContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const handleSuccessfulLogin = (token, decodedToken) => {
    const user = {
      username: decodedToken.sub,
      roles: decodedToken.roles ? decodedToken.roles.split(",") : [],
    };
    localStorage.setItem("JWT", token);
    localStorage.setItem("USER", JSON.stringify(user));

    setToken(token);
    navigate("/notes");
  };

  const loginHandler = async (data) => {
    try {
      setLoading(true);
      const resp = await api.post("/auth/public/signin", data);

      toast.success("Login Succesful");
      reset();

      if (resp.status === 200 && resp.data.jwtToken) {
        setJwtToken(resp.data.jwtToken);
        const decodedToken = jwtDecode(resp.data.jwtToken);
        handleSuccessfulLogin(resp.data.jwtToken, decodedToken);
      } else {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      if (error) {
        toast.error("Invalid Credentials !!!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4"
      >
        <div>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Login Here
          </h1>
          <p className="text-slate-600 text-center">
            Please Enter your Username and Password
          </p>
          <div className="flex items-center justify-between gap-1 py-5">
            <Link
              to={`${apiUrl}/oauth2/authorization/google`}
              className="flex gap-1 items-center justify-center flex-1 border p-2 shadow-sm shadow-slate-200 rounded-md hover:bg-slate-300 transition-all duration-300"
            >
              <span>
                <FcGoogle className="text-2xl" />
              </span>
              <span className="font-semibold sm:text-customText text-xs">
                Login With Google
              </span>
            </Link>
            <Link
              to={`${apiUrl}/oauth2/authorization/github`}
              className="flex gap-1 items-center justify-center flex-1 border p-2 shadow-sm shadow-slate-200 rounded-md hover:bg-slate-300 transition-all duration-300"
            >
              <span>
                <FaGithub className="text-2xl" />
              </span>
              <span className="font-semibold sm:text-customText text-xs">
                Login With Github
              </span>
            </Link>
          </div>
          <Divider className="font-semibold">OR</Divider>
        </div>
        <div className="flex flex-col gap-2">
          <InputField
            label="Username"
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Enter your name"
            register={register}
            errors={errors}
          ></InputField>
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            errors={errors}
          ></InputField>
        </div>
        <Button
          disable={loading}
          onClickHandler={() => {}}
          type="text"
          className="bg-customRed font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
        >
          {loading ? <span>Loading...</span> : "LogIn"}
        </Button>
        <p className="text-left text-sm text-slate-700">
          <Link
            to="/forgot-password"
            className="font-semibold underline hover:text-black"
          >
            Forgot Password?
          </Link>
        </p>
        <p className="text-center text-sm text-slate-700 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold underline hover:text-black"
          >
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
