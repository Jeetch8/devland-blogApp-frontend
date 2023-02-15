import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMenuOutline } from "react-icons/io5";
import DropDownNavBar from "./DropDownNavBar";

const NavBar = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className="flex justify-between pt-[30px] pb-[10px] mx-[10vw] border-b-[4px] px-[20px] bg-[#FFF]">
      <BsSearch className="text-[20px]" />
      <h3 className="text-[20px]">DevLand</h3>
      <div className="relative">
        <button onClick={() => setShowDropDown(!showDropDown)}>
          <IoMenuOutline className="text-[25px]" />
        </button>
        {showDropDown && (
          <DropDownNavBar
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
