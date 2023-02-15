import React, { useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import { BiLogIn } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const DropDownNavBar = ({ setShowDropDown, showDropDown }) => {
  const ulElement = useRef(null);
  const navigate = useNavigate();

  document.addEventListener("scroll", (e) => {
    if (
      ulElement.current &&
      showDropDown &&
      !ulElement.current.contains(e.target)
    ) {
      setShowDropDown(false);
    }
  });
  const isLogged = false;
  return (
    <div
      className="absolute border-2 border-zinc-300 bg-white border-b-none rounded-md top-7 font-extralight"
      ref={ulElement}
    >
      <ul>
        <li
          className="border-b-[1px]  px-[20px] pt-[20px] pb-[4px] flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <AiOutlineUser className="text-[25px]" />
          Profile
        </li>
        <li className="border-b-[1px]  px-[20px] pt-[20px] pb-[4px] whitespace-nowrap flex items-center cursor-pointer gap-2">
          <BsBookmark
            className="text-[20px]"
            onClick={() => navigate("/bookmarks")}
          />
          Bookmarks
        </li>
        {!isLogged && (
          <li className="border-b-[1px]  pr-[20px] pl-[15px] pt-[20px] pb-[4px] flex items-center cursor-pointer gap-2">
            <BiLogIn className="text-[22px]" />
            Login/Register
          </li>
        )}
        <li className="border-b-[1px]  px-[20px] pt-[20px] pb-[4px] flex items-center cursor-pointer gap-2">
          <TfiWrite
            className="text-[20px]"
            onClick={() => navigate("/writeBlog")}
          />
          Write Blog
        </li>
        <li className="px-[20px] whitespace-nowrap pt-4">
          <h2 className="font-semibold">Change Theme To:</h2>
          <div className="flex gap-2 justify-center py-2">
            <div className=" bg-orange-500 h-[25px] w-[25px] rounded-full"></div>
            <div className="h-[25px] w-[25px] rounded-full bg-emerald-600"></div>
            <div className="h-[25px] w-[25px] rounded-full bg-pink-900"></div>
            <div className="h-[25px] w-[25px] rounded-full bg-yellow-700"></div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DropDownNavBar;
