import React from "react";
import { HiLockClosed } from "react-icons/hi";

const BookmarCards = () => {
  return (
    <div className="flex justify-between border-[1px] border-zinc-300 bg-[#FAFAFA]">
      <div className="ml-5">
        <h2 className=" font-bold text-[22px] mt-5 mb-[60px]">Reading list</h2>
        <div className="flex items-center gap-3">
          <button className="border-black border-[1px] rounded-full px-3 py-1 text-[14px]">
            View list
          </button>
          <h2 className="flex items-center gap-1 text-zinc-500">
            1 Story <HiLockClosed className="text-[13px]" />
          </h2>
        </div>
      </div>
      <div>
        <img
          src="https://i.ibb.co/G35CZh1/1-pg-Dpt-M-VJLbwvn-ia9bm-A.png"
          alt="1-pg-Dpt-M-VJLbwvn-ia9bm-A"
          border="0"
          className="h-[170px]"
        ></img>
      </div>
    </div>
  );
};

export default BookmarCards;
