import React from "react";
import Navbar from "../Components/Global/Navbar";
import BookmarkCards from "../Components/Bookmark/BookmarCards";

const Bookmarks = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1100px]">
        <div className="max-w-[700px] m-auto">
          <div className="flex items-center justify-between my-[60px]">
            <h2 className="text-[40px] font-bold">Your lists</h2>
            <button className="bg-[#1A8917] py-2 px-4 rounded-full text-white font-medium">
              New list
            </button>
          </div>
          <BookmarkCards />
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
