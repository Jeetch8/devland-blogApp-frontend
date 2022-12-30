import React from "react";

const BookmarkDropDownList = ({ el, blogId }) => {
  const bookList = el.split(" ");
  const localListRaw = localStorage.getItem(
    [...bookList, "Bookmark"].join(".")
  );
  const localListParsed = JSON.parse(`"${localListRaw}"`).split(",");
  const blogExist = localListParsed.indexOf(blogId);

  return (
    <>
      <li className="px-4 py-1 flex items-center">
        <input
          type={"checkbox"}
          className="cursor-pointer mr-2"
          defaultChecked={blogExist === -1 ? false : true}
        />
        <h2>{el}</h2>
      </li>
    </>
  );
};

export default BookmarkDropDownList;
