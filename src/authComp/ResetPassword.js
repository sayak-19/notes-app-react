import { Divider } from "@mui/material";
import React, { useState } from "react";
import InputField from "../utils/InputField";
import Button from "../utils/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import api from "../services/api";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  });

  const handleResetRequest = async (data) => {
    const { password } = data;
    const token = searchParam.get("token");

    setLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("newPassword", password);
      await api.post("/auth/public/reset-password", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      toast.success("Password reset successful! You can now log in.");
      reset();
      navigate("/login");
    } catch (err) {
      console.log("error", err);
      toast.error("Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleResetRequest)}
        className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4"
      >
        <div>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Reset Password
          </h1>
          <p className="text-slate-600 text-center">
            Enter New Password to update it
          </p>
        </div>
        <Divider className="font-semibold pb-4" />
        <div className="flex flex-col gap-2 mt-4">
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            placeholder="Enter your password"
            message="*Password is required"
            register={register}
            errors={errors}
            min={6}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />{" "}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <InputField
            label="Confirm Password"
            required
            id="confirmPassword"
            type="password"
            placeholder="Enter the same password"
            message="*Please confirm your password"
            register={register}
            errors={errors}
            min={6}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />{" "}
        </div>
        <Button
          disable={loading}
          onClickHandler={() => {}}
          className="bg-customRed font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
          type="text"
        >
          {loading ? "Loading ..." : "Send"}
        </Button>
        <p className=" text-sm text-slate-700 ">
          <Link className=" underline hover:text-black" to="/login">
            Back To Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
