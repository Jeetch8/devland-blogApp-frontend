import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [showPass, seTShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const handleImageChange = (e) => {
    const img = e.target.files[0];
    let imgData = new FormData();
    imgData.append("image", img);
    axios
      .post("/imageUpload/imagaeUploadCloudniary", imgData)
      .then((res) => setProfileImg(res.data.image.src));
  };

  const { mutate } = useMutation(
    ["registerReq"],
    () => {
      return axios.post("/auth/register", {
        profileImg,
        password,
        name,
        email,
      });
    },
    {
      onSuccess: (res) => {
        const respData = res.data;
        localStorage.clear();
        localStorage.setItem("blogProfileImg", respData.profileImg);
        localStorage.setItem("blogName", respData.userName);
        localStorage.setItem("blogToken", respData.token);
        localStorage.setItem("blogUserId", respData.userId);
        localStorage.setItem("blogEmail", respData.email);
        if (res.data.success) {
          toast.success("Registration successfull", {
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
        navigate("/");
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

  const registerFunc = () => {
    if (!password || !confPassword || !email || !name) {
      toast.error("All fields are mandatory to register", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "dark",
      });
      return;
    }
    if (password !== confPassword) {
      toast.error("Password doesn't match", {
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
        <h2 className="text-[25px] font-bold">Register</h2>
        {/* Profile Img */}
        <div className="flex justify-center w-[18vw] mt-8 mb-4">
          <label htmlFor="profileImage" className="cursor-pointer">
            <div className=" border-double border-black border-4 rounded-full w-fit">
              {profileImg ? (
                <img
                  src={profileImg}
                  alt="profile"
                  className="rounded-full object-cover w-[110px]"
                />
              ) : (
                <div className="text-[40px] p-8">
                  <AiOutlineUser />
                </div>
              )}
            </div>
          </label>
          <input
            id="profileImage"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-4 py-1 pl-2 pr-10 bg-neutral-100 w-fit rounded-md"
        />
        {/* Email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mt-4 py-1 pl-2 pr-10 bg-neutral-100 w-fit rounded-md"
        />
        {/* Password */}
        <div className="flex mt-4 bg-neutral-100 w-fit rounded-md">
          <input
            value={password}
            placeholder="Password"
            type={showPass ? "text" : "password"}
            className="px-2 py-1 bg-transparent outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => seTShowPass(!showPass)}
            className="p-2 bg-neutral-100"
          >
            {showPass ? <RxEyeOpen /> : <RiEyeCloseLine />}
          </button>
        </div>
        {/* Confirm Password */}
        <div className="flex  mt-4 mb-8 bg-neutral-100 w-fit rounded-md">
          <input
            value={confPassword}
            placeholder="Confirm Password"
            type={showPass ? "text" : "password"}
            onChange={(e) => setConfPassword(e.target.value)}
            className="px-2 py-1 bg-transparent outline-none"
          />
          <button
            onClick={() => seTShowPass(!showPass)}
            className="p-2 bg-neutral-100"
          >
            {showPass ? <RxEyeOpen /> : <RiEyeCloseLine />}
          </button>
        </div>
        <button
          className="bg-black text-white rounded-md px-4 py-1 w-fit"
          onClick={() => registerFunc()}
        >
          Register
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
