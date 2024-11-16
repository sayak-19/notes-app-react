import { Divider } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../utils/InputField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "ontouchend" });

  const forgotPasswordHandler = async (data) => {
    const { email } = data;
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
      await api.post("/auth/public/forgot-password", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      reset();
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      toast.error("Error sending password reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(forgotPasswordHandler)}
        className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4"
      >
        <div>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Forgot Password?
          </h1>
          <p className="text-slate-600 text-center">
            Enter your email a Password reset email will sent
          </p>
        </div>
        <Divider className="font-semibold pb-4" />
        <div className="flex flex-col gap-2 mt-4">
          <InputField
            label="Email"
            required
            id="email"
            type="email"
            placeholder="Enter your email"
            message="*Email is required"
            register={register}
            errors={errors}
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
        <p className="text-sm text-slate-700">
          <Link to="/login" className="underline hover:text-black">
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
