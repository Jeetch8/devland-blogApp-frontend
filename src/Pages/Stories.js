import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Global/Navbar";

const Stories = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-[1100px]">
        <div className="max-w-[700px] m-auto">
          <div className="flex items-center justify-between my-[50px]">
            <h1 className="text-[42px] font-bold">Your stories</h1>
            <div>
              <button
                onClick={() => navigate("/writeblog")}
                className="bg-[#1A8917] py-2 px-5 text-[14px] rounded-full text-white font-medium"
              >
                Write a story
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
