import React, { useEffect, useState } from "react";
import BookmarkDropDownList from "./BookmarkDropDownList";

const BookMarkDropDown = ({ showDropdown, blogId, bookmarkName }) => {
  return (
    <>
      {showDropdown && (
        <ul className="text-[17px] text-slate-600 font-medium absolute bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mt-3 top-4 left-1 whitespace-nowrap">
          <div className="py-2">
            {bookmarkName.map((el, i) => {
              return <BookmarkDropDownList el={el} key={i} blogId={blogId} />;
            })}
          </div>
          <li className="border-t-[1px] border-gray-400 py-2 px-4 cursor-pointer">
            Create new list
          </li>
        </ul>
      )}
    </>
  );
};

export default BookMarkDropDown;
