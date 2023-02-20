import React, { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { CiBookmarkPlus } from "react-icons/ci";
import { FiMoreHorizontal } from "react-icons/fi";
import Navbar from "../../Components/HomePage/GlobalComponents/NavBar";
import { IoShareOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { convert } from "html-to-text";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";

const SingleBlog = () => {
  const [blogContent, setBlogContent] = useState({});
  const [liked, setLiked] = useState(false);
  const params = useParams();
  const { isFetching, isLoading } = useQuery(
    ["fetchblog"],
    () => {
      return axios.get(`http://localhost:5000/api/v1/blogs/${params.blogId}`);
    },
    {
      onSuccess: (data) => {
        const blog = data.data.blog;
        setBlogContent(blog);
        console.log(blog);
        for (let i = 0; i < blog.likedArray.length; i++) {
          if (blog.likedArray[i]._id === localStorage.getItem("blogUserId")) {
            setLiked(true);
            break;
          }
        }
      },
    }
  );

  // Write a quesry to like a blog
  const likeBlog = async () => {
    try {
      const response = await axios
        .patch(
          `http://localhost:5000/api/v1/blogs/${params.blogId}/like`,
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("blogToken")}`,
            },
          }
        )
        .then((res) => {
          setLiked(true);
        });
      // Handle the response or update the state accordingly
    } catch (error) {
      console.log(error);
      // Handle the error
      toast.error("Something went wrong");
    }
  };
  // Write a query to comment on a blog
  // Write a query to bookmark a blog

  if (isFetching || isLoading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <HashLoader />
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div>
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[700px] mx-auto mt-10">
            {/* Top Section with profile and oyher details */}
            {/* Title */}
            <h1 className="text-[30px] my-6 text-center">
              {blogContent.title}
            </h1>
            <h4 className="text-center mb-4 text-[14px] text-zinc-500">
              21 July 2022
            </h4>
            <img
              src={blogContent.blogImg}
              alt="blogImg"
              className="mb-8 rounded-sm mt-6"
            />
            <h2 className="text-[18px] font-light">
              {convert(blogContent.content)}
            </h2>
            {/* Like and comment section */}
            <div className="flex justify-between text-[20px] items-center text-zinc-500 mt-[30px] pb-[60px] border-b-[1px] border-solid-black">
              <div className="flex items-center gap-5">
                {liked ? (
                  <AiFillLike />
                ) : (
                  <AiOutlineLike
                    onClick={() => likeBlog()}
                    className="cursor-pointer"
                  />
                )}
                <GoComment />
              </div>
              <div className="flex items-center gap-5 text-[25px]">
                <CiBookmarkPlus />
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SingleBlog;
