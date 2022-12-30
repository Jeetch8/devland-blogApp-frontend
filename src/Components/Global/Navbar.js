import React, { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TfiWrite } from "react-icons/tfi";
import { IoBookmarksOutline, IoNotificationsOutline } from "react-icons/io5";
import { RiArrowDownSLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { TbNotes } from "react-icons/tb";
import { BsBarChart } from "react-icons/bs";
import { AiFillStar, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const ulElement = useRef(null);
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  window.addEventListener("scroll", () => {
    if (dropDown) setDropDown(false);
  });

  // document.addEventListener("focusout", () => {
  //   console.log("out")
  // })
  document.addEventListener("mousedown", (e) => {
    if (
      ulElement.current &&
      dropDown &&
      !ulElement.current.contains(e.target)
    ) {
      setDropDown(false);
    }
  });

  const logoutFunc = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex border-b-[1px] border-slate-200 py-2 justify-between items-center sticky top-0 bg-white z-10">
      <div className="flex">
        <img
          src="https://i.ibb.co/DzZKZHY/medium-icon-white-on-black.png"
          height={60}
          width={65}
          className="mr-2 cursor-pointer"
          alt="logo"
          onClick={() => navigate("/")}
        />
        {/* Search bar */}
        <div className=" bg-zinc-100 flex items-center h-fit pl-3 pr-4 py-2 rounded-3xl">
          <CiSearch className="h-[25px] w-[25px]" />
          <input
            type={"text"}
            className="py-1 outline-none bg-transparent ml-3"
            placeholder="Search Medium"
          />
        </div>
      </div>
      <div className="flex items-center gap-8 mr-8">
        <div
          className="flex items-center gap-2  cursor-pointer"
          onClick={() => navigate("/writeblog")}
        >
          <TfiWrite className="fill-slate-600 text-[20px] hover:fill-black" />
          <h2 className="text-slate-600 text-[15px] hover:text-black">Write</h2>
        </div>
        <IoNotificationsOutline className="text-slate-500 text-[25px]" />
        <div className="relative">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setDropDown(!dropDown)}
          >
            {localStorage.getItem("blogProfileImg") ? (
              <img
                src={localStorage.getItem("blogProfileImg")}
                alt="avatar"
                width={35}
                height={35}
                className="rounded-full h-[35px] w-[35px] object-cover"
              />
            ) : (
              <AiOutlineUser className="border-[1px] border-black rounded-full text-[27px] p-1" />
            )}
            <RiArrowDownSLine className="fill-slate-400" />
          </div>
          {dropDown && (
            <ul
              className="text-[17px] text-slate-600 font-medium absolute right-2 p-5 bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mt-3"
              ref={ulElement}
            >
              {localStorage.getItem("blogUserId") &&
              localStorage.getItem("blogEmail") &&
              localStorage.getItem("blogName") ? (
                <>
                  <li className="flex items-center gap-2 my-3 cursor-pointer">
                    <FiUser className="text-[21px]" /> Profile
                  </li>
                  <li
                    className="flex items-center gap-2 my-3 cursor-pointer"
                    onClick={() => navigate("/me/lists")}
                  >
                    <IoBookmarksOutline className="text-[21px]" /> Lists
                  </li>
                  <li className="flex items-center gap-2 my-3 cursor-pointer">
                    <TbNotes className="text-[21px]" /> Stories
                  </li>
                  <li className="flex items-center gap-2 my-3 cursor-pointer">
                    <BsBarChart className="text-[21px]" /> Stats
                  </li>
                  <li className="flex whitespace-nowrap items-center gap-5 py-3 cursor-pointer border-t-[1px] border-slate-200">
                    Become a member{" "}
                    <AiFillStar className="mr-2 fill-amber-500" />
                  </li>
                  <div onClick={() => logoutFunc()}>
                    <li className="border-t-[1px] border-slate-200 pt-3 cursor-pointer">
                      Sign out
                    </li>
                    <li className="text-[14px] font-normal mb-3 cursor-pointer">
                      {localStorage.getItem("blogEmail")}
                    </li>
                  </div>
                </>
              ) : (
                <>
                  <li
                    className="flex items-center gap-2 my-3 cursor-pointer pr-8 pl-2"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </li>
                  <li
                    className="flex items-center gap-2 my-3 cursor-pointer pr-8 pl-2"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
