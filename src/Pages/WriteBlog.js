import React, { useState } from "react";
import JoditEditor from "jodit-react";

const WriteBlog = () => {
  const [content, setContent] = useState("");
  console.log(content);
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex justify-between">
        <img
          src="https://i.ibb.co/DzZKZHY/medium-icon-white-on-black.png"
          alt="logo"
          width={60}
          height={60}
        />
        <div className="flex items-center gap-3 text-[13px]">
          <button className="py-1 h-fit border-[1px] borde-solid-black rounded-full px-3">
            Draft
          </button>
          <button className="bg-[#1A8917] py-1 px-2 rounded-full h-fit text-white">
            Publish
          </button>
        </div>
      </div>
      <input
        type={"text"}
        placeholder="Title"
        className="text-[22px] my-4 mx-4"
      />
      <div className="mx-4">
        <JoditEditor onBlur={(e) => setContent(e)} />
      </div>
    </div>
  );
};

export default WriteBlog;
