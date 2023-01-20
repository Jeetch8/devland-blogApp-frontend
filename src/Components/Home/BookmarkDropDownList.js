import React, { useState } from "react";
import axios from "axios";

const BookmarkDropDownList = ({ el, blogId }) => {
  const [boxChecked, setBoxChecked] = useState(false);
  const sendbookmarkReqFunction = (res) => {
    if (res.target.checked) {
      axios
        .post("/user/addBlogsToCategory", { catId: el.catId, blogId })
        .then((res) => console.log(res.data));
    } else if (!res.target.checked) {
      axios
        .post("/user/removeBlogFromBookmarkCategory", {
          catId: el.catId,
          blogId,
        })
        .then((res) => console.log(res.data));
    }
  };
  return (
    <>
      <li className="px-4 py-1 flex items-center">
        <input
          type={"checkbox"}
          className="cursor-pointer mr-2"
          defaultChecked={el.isSaved ? true : false}
          onChange={sendbookmarkReqFunction}
        />
        <h2>{el.catTitle}</h2>
      </li>
    </>
  );
};

export default BookmarkDropDownList;
