import React, { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMenuOutline } from "react-icons/io5";
import DropDownNavBar from "./DropDownNavBar";
import axios from "axios";

const NavBar = ({ refetch, searchQuery, setSearchQuery }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef(null);

  const closeOpenMenus = (e) => {
    if (dropDownRef && !dropDownRef.current?.contains(e.target)) {
      setShowDropDown(false);
    }
  };
  document.addEventListener("mousedown", closeOpenMenus);

  const handleBlogSearch = () => {
    if (searchQuery.length < 3) return;
    refetch();
  };

  return (
    <div className="flex justify-between pt-[30px] pb-[10px] mx-[10vw] border-b-[4px] px-[20px] bg-[#FFF] relative">
      <div></div>
      <div
        className="border-2 border-gray-200 border-solid absolute flex rounded-xl px-2 py-1"
        onKeyDown={(e) => e.key === "Enter" && handleBlogSearch()}
      >
        <BsSearch className="text-[20px]" onClick={() => handleBlogSearch()} />
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          onKeyDown={(e) => e.key === "Enter" && handleBlogSearch()}
          type="text"
          className="focus:outline-none hover:outline-none px-3"
        />
      </div>
      <h3 className="text-[20px]">DevLand</h3>
      <div className="relative">
        <button onClick={() => setShowDropDown(!showDropDown)}>
          <IoMenuOutline className="text-[25px]" />
        </button>
        {showDropDown && (
          <DropDownNavBar
            dropDownRef={dropDownRef}
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
