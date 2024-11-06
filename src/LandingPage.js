import React from "react";
import { useAppContext } from "./store/ContextApi";
import { Link } from "react-router-dom";
import Button from "./utils/Button";
import { motion } from "framer-motion";

const fadeInFromTop = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
const fadeInFromBotom = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const LandingPage = () => {
  const { token } = useAppContext();

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center">
      <div className="lg:w-[80%] w-full py-16 space-y-4">
        <h3 className="text-logoText md:text-2xl text-xl font-semibold text-slate-800 text-center ">
          <motion.h1
            className="font-montserrat uppercase text-headerColor  xl:text-headerText md:text-4xl text-2xl mx-auto text-center font-bold sm:w-[95%] w-full"
            initial="hidden"
            animate="visible"
            variants={fadeInFromTop}
          >
            Turn your thoughts into secure, organized notes And Faster.
          </motion.h1>
        </h3>
        <p className="text-slate-700 text-center sm:w-[80%] w-[90%] mx-auto">
          Manage your notes effortlessly and securely. Just type, save, and
          access them from anywhere with robust encryption and seamless
          synchronization.
        </p>
        <motion.div
          className="flex items-center justify-center gap-3 py-10"
          initial="hidden"
          animate="visible"
          variants={fadeInFromBotom}
        >
          {token ? (
            <>
              <Link to="/create-note">
                <Button className="sm:w-52 w-44 bg-customRed font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-10 py-3 rounded-sm">
                  Create Note
                </Button>
              </Link>
              <Link to="/notes">
                <Button className="sw:w-52 w-44 bg-btnColor font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-10 py-3 rounded-sm">
                  My Note
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="sm:w-52 w-44 bg-customRed font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-10 py-3 rounded-sm">
                  SignIn
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="sm:w-52 w-44 bg-btnColor font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-10 py-3 rounded-sm">
                  SignUp
                </Button>
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
