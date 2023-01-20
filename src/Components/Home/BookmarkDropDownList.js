import React from "react";

const BookmarkDropDownList = ({ el, blogId }) => {
  return (
    <>
      <li className="px-4 py-1 flex items-center">
        <input
          type={"checkbox"}
          className="cursor-pointer mr-2"
          defaultChecked={el.isSaved ? true : false}
        />
        <h2>{el.catTitle}</h2>
      </li>
    </>
  );
};

export default BookmarkDropDownList;
