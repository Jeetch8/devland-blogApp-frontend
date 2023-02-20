import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [showPass, seTShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { mutate } = useMutation(
    ["loginReq"],
    () => {
      return axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });
    },
    {
      onSuccess: (res) => {
        const respData = res.data;
        console.log(respData);
        localStorage.clear();
        localStorage.setItem("blogProfileImg", respData.profileImg);
        localStorage.setItem("blogName", respData.userName);
        localStorage.setItem("blogToken", respData.token);
        localStorage.setItem("blogUserId", respData.userId);
        localStorage.setItem("blogEmail", respData.email);
        if (res.data.success) {
          toast.success("Login successfull", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            theme: "dark",
          });
          toast.loading("Redirecting to home page", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
          });
        }
        setTimeout(() => {
          toast.dismiss();
          navigate("/");
        }, 3000);
      },
      onError: (res) => {
        const msg = res.response.data.msg;
        if (msg === "Password was incorrect") {
          toast.error("Password is incorrect", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
          });
        } else if (msg === "Email not found") {
          toast.error("Email is incorrect", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
          });
        } else {
          toast.error("PSomething went wrong, please try again", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            theme: "dark",
          });
        }
      },
    }
  );

  const registerMutateError = (msg) => {};

  const loginFunc = () => {
    if (!password || !email) {
      toast.error("All fields are mandatory to login", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "dark",
      });
      return;
    }
    mutate();
  };

  return (
    <div className="flex">
      {/* Left Side */}
      <div className="w-[50vw] flex justify-center items-center h-[100vh] bg-neutral-300">
        <img
          src="https://i.ibb.co/DzZKZHY/medium-icon-white-on-black.png"
          alt="logo"
        />
      </div>
      {/* Right Side */}
      <div className="w-[50vh] flex justify-center flex-col pl-8">
        <h2 className="text-[25px] font-bold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="mt-10 py-1 pl-2 pr-10 bg-neutral-100 w-fit rounded-md"
        />
        <div className="flex mt-4 my-8 bg-neutral-100 w-fit rounded-md">
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPass ? "text" : "password"}
            className="px-2 py-1 bg-transparent outline-none"
          />
          <button
            onClick={() => seTShowPass(!showPass)}
            className="p-2 bg-neutral-100"
          >
            {showPass ? <RxEyeOpen /> : <RiEyeCloseLine />}
          </button>
        </div>
        <h2 className="text-[13px] mb-4">
          Don't have an account already?{" "}
          <Link to={"/register"} className=" text-green-300 hover:underline">
            Register
          </Link>
        </h2>
        <button
          className="bg-black text-white rounded-md px-4 py-1 w-fit"
          onClick={() => loginFunc()}
        >
          Login
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
