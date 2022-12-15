import React, { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

const StoriesBlogs = () => {
  const [dropDown, setDropDown] = useState(false);
  return (
    <div className="py-8 border-b-[1px] border-zinc-300">
      <h1 className="font-bold text-[16px]">Blog Title</h1>
      <div className="flex gap-2 items-center text-[14px] text-zinc-700 relative">
        <h3>Last edited about 3 hours ago</h3>
        <h3>1min read (1 word) so far</h3>
        <div className="relative">
          <RiArrowDownSLine
            onClick={() => setDropDown(!dropDown)}
            className="cursor-pointer"
          />
          {dropDown && (
            <ul className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] absolute left-0 p-4 whitespace-nowrap rounded-md bg-white">
              <li>Edit Draft</li>
              <li className="text-red-500 font-medium">Delete Draft</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoriesBlogs;
