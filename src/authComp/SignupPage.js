import React, { useEffect, useState } from "react";
import InputField from "../utils/InputField";
import Button from "../utils/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../store/ContextApi";
import api from "../services/api";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState();

  const { token } = useAppContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    setRole("ROLE_USER");
  }, []);

  const onSubmitHandler = async (data) => {
    const { username, email, password } = data;
    const sendData = {
      username,
      email,
      password,
      role: [role],
    };

    try {
      setLoading(true);
      const resp = await api.post("/auth/public/signup", sendData);
      toast.success("Registration Successful");
      reset();

      if (resp.data) {
        navigate("/login");
      }
    } catch (error) {
      if (
        error?.response?.data?.message === "Error: Username is already taken!"
      ) {
        setError("username", { message: "username is already taken" });
      } else if (
        error?.response?.data?.message === "Error: Email is already in use!"
      ) {
        setError("email", { message: "Email is already in use" });
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
        onSubmit={handleSubmit(onSubmitHandler)}
        className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4"
      >
        <div>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Register Here
          </h1>
          <p className="text-slate-600 text-center">
            Enter your credentials to create new account
          </p>
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
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="Enter your email"
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
          {loading ? <span>Loading...</span> : "SignUp"}
        </Button>
        <p className="text-center text-sm text-slate-700 mt-600">
          Don't have an account?{" "}
          <Link
            to="/login"
            className="font-semibold underline hover:text-black"
          >
            LogIn
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
