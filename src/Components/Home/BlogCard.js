import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AiFillStar, AiOutlineUser } from "react-icons/ai";
import { CiBookmarkPlus } from "react-icons/ci";
import { FiMoreHorizontal } from "react-icons/fi";
import { convert } from "html-to-text";
import BookMarkDropDown from "./BookMarkDropDown";
import { BsBookmarkCheckFill } from "react-icons/bs";

const BlogCard = ({ blog, allBookedBlogs }) => {
  const allBookedBlogList = [...allBookedBlogs];
  const [bookmarkName, setBookmarkName] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const ulElement = useRef(null);

  useEffect(() => {
    const obj = Object.keys(localStorage);
    const localStorageBookmarks = obj.filter((ele) => {
      let splited = ele.split(".");
      return splited[splited.length - 1] === "Bookmark";
    });
    localStorageBookmarks.forEach((el) => {
      const names = el
        .split(".")
        .slice(0, el.split(".").length - 1)
        .join(" ");
      const alreadyExist = bookmarkName.indexOf(names);
      if (alreadyExist === -1) {
        bookmarkName.push(names);
      }
    });
  }, []);

  document.addEventListener("mousedown", (e) => {
    if (
      ulElement.current &&
      showDropdown &&
      !ulElement.current.contains(e.target)
    ) {
      setShowDropdown(false);
    }
  });

  return (
    <div className="border-b-[1px] border-slate-200 flex items-center gap-16 w-full">
      <div className="py-7">
        <div className="flex items-center">
          {localStorage.getItem("blogProfileImg") ? (
            <img
              src={blog.results.profileImg}
              alt="profileImg"
              width={25}
              className="rounded-full mr-2 w-[23px] h-[23px]"
            />
          ) : (
            <AiOutlineUser className="border-[1px] border-black rounded-full text-[19px] mr-2" />
          )}
          <h2 className="mr-1 font-medium">{blog.results.name}</h2>.
          <h2 className="ml-1 mr-2 text-gray-500 font-medium text-[14px]">
            Jun 5, 2020
          </h2>
          <AiFillStar className="mr-2 fill-amber-500" />
          <h2 className="text-gray-500 font-medium text-[14px]">Member-only</h2>
        </div>
        <h1 className="font-bold text-[22px]">{blog.title}</h1>
        <h2 className="text-[15px] max-w-[500px]">
          {/* {blog.HTMLBody ? parsedDesc?.substring(0, 215) : null} */}
          {convert(blog.HTMLBody).substring(0, 215)}
          ...
        </h2>
        <div className="flex justify-between items-center mt-8 mb-3 w-[33vw]">
          <h2 className="text-gray-500 text-[14px]">{blog.readingTime}</h2>
          <div className="flex items-baseline gap-4">
            <div className="relative" ref={ulElement}>
              {allBookedBlogList.indexOf(blog._id) !== -1 ? (
                <BsBookmarkCheckFill
                  className="fill-gray-600 text-[20px] cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
              ) : (
                <CiBookmarkPlus
                  className="fill-gray-600 text-[22px] cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
              )}
              <BookMarkDropDown
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                blogId={blog._id}
                bookmarkName={bookmarkName}
              />
            </div>
            <FiMoreHorizontal className="text-[22px]" />
          </div>
        </div>
      </div>
      <div className="mr-4">
        <img src={blog.blogImg} className="h-[100px] w-[110px] object-cover" />
      </div>
    </div>
  );
};

export default BlogCard;
