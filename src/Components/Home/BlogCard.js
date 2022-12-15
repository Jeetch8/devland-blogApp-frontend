import React from "react";
import { AiFillStar } from "react-icons/ai";
import { CiBookmarkPlus } from "react-icons/ci";
import { FiMoreHorizontal } from "react-icons/fi";

const BlogCard = () => {
  const descrpt =
    "I want to show you an easy and simple way to display PDF files using React in the browser. I will be using a library called react-pdf. This library is capable of rendering PDF files given an URL or a local file inside the project or base64 encoded version.";
  return (
    <div className="border-b-[1px] border-slate-200 flex items-center gap-16 w-full">
      <div className="py-7">
        <div className="flex items-center">
          <img
            src={localStorage.getItem("blogProfileImg")}
            alt="profileImg"
            width={25}
            className="mr-2"
          />
          <h2 className="mr-1 font-medium">Jeet Chawda</h2>.
          <h2 className="ml-1 mr-2 text-gray-500 font-medium text-[14px]">
            Jun 5, 2020
          </h2>
          <AiFillStar className="mr-2 fill-amber-500" />
          <h2 className="text-gray-500 font-medium text-[14px]">Member-only</h2>
        </div>
        <h1 className="font-bold text-[22px]">Displaying PDF in React app</h1>
        <h2 className="text-[15px] max-w-[500px]">
          {descrpt.substring(0, 215)}...
        </h2>
        <div className="flex justify-between items-center mt-8 mb-3">
          <h2 className="text-gray-500 text-[14px]">2 min read</h2>
          <div className="flex items-baseline gap-4">
            <CiBookmarkPlus className="fill-gray-600 text-[22px]" />
            <FiMoreHorizontal className="text-[22px]" />
          </div>
        </div>
      </div>
      <div>
        <img
          src="https://miro.medium.com/max/828/1*Y15yriWFiKPFhus3wQBIGw.webp"
          className="h-[100px] w-[110px] object-cover"
        />
      </div>
    </div>
  );
};

export default BlogCard;
