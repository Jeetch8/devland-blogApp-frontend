import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TfiWrite } from "react-icons/tfi";
import { IoBookmarksOutline, IoNotificationsOutline } from "react-icons/io5";
import { RiArrowDownSLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { TbNotes } from "react-icons/tb";
import { BsBarChart } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  window.addEventListener("scroll", () => {
    if (dropDown) setDropDown(false);
  });

  return (
    <div className="flex border-b-[1px] border-slate-200 py-2 justify-between items-center sticky top-0 bg-white">
      <div className="flex">
        <img
          src="https://i.ibb.co/DzZKZHY/medium-icon-white-on-black.png"
          height={60}
          width={65}
          className="mr-2"
          alt="logo"
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
            <img
              src={localStorage.getItem("blogProfileImg")}
              alt="avatar"
              width={35}
              height={35}
            />
            <RiArrowDownSLine className="fill-slate-400" />
          </div>
          {dropDown && (
            <ul className="text-[17px] text-slate-600 font-medium absolute right-2 p-5 bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mt-3">
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
                Become a member <AiFillStar className="mr-2 fill-amber-500" />
              </li>
              <li className="border-t-[1px] border-slate-200 pt-3 cursor-pointer">
                Sign out
              </li>
              <li className="text-[14px] font-normal mb-3 cursor-pointer">
                jeetkumar0898@gmail.com
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
