import React from "react";
import { BsSearch } from "react-icons/bs";
import { IoMenuOutline } from "react-icons/io5";

const NavBar = () => {
  return (
    <div className="flex justify-between pt-[30px] pb-[20px] mx-[10vw] border-b-[1px] px-[20px] border-black sticky top-0 bg-white">
      <BsSearch />
      <h3>DevLand</h3>
      <IoMenuOutline />
    </div>
  );
};

export default NavBar;
