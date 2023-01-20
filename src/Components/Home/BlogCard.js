import React, { useRef, useState } from "react";
import { AiFillStar, AiOutlineUser } from "react-icons/ai";
import { CiBookmarkPlus } from "react-icons/ci";
import { FiMoreHorizontal } from "react-icons/fi";
import { convert } from "html-to-text";
import BookMarkDropDown from "./BookMarkDropDown";
import { BsBookmarkCheckFill } from "react-icons/bs";

const BlogCard = ({ blog }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ulElement = useRef(null);

  document.addEventListener("mousedown", (e) => {
    if (
      ulElement.current &&
      showDropdown &&
      !ulElement.current.contains(e.target)
    ) {
      setShowDropdown(false);
    }
  });

  const isBlogBookmarked = blog.blogBookmarks.find((el) => {
    return el.isSaved === true;
  });

  return (
    <div className="border-b-[1px] border-slate-200 flex items-center gap-16 w-full">
      <div className="py-7">
        <div className="flex items-center">
          {localStorage.getItem("blogProfileImg") ? (
            <img
              src={blog.creator.profileImg}
              alt="profile Image"
              width={25}
              className="rounded-full mr-2 w-[23px] h-[23px]"
            />
          ) : (
            <AiOutlineUser className="border-[1px] border-black rounded-full text-[19px] mr-2" />
          )}
          <h2 className="mr-1 font-medium">{blog.creator.name}</h2>.
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
              {isBlogBookmarked ? (
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
                blogBookmarks={blog.blogBookmarks}
              />
            </div>
            <FiMoreHorizontal className="text-[22px]" />
          </div>
        </div>
      </div>
      <div className="mr-4">
        <img
          src={blog.blogImg}
          className="h-[100px] w-[110px] object-cover"
          alt="blog image"
        />
      </div>
    </div>
  );
};

export default BlogCard;
