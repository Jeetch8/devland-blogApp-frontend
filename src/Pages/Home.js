import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import Navbar from "../Components/Global/Navbar";
import BlogCard from "../Components/Home/BlogCard";
import RightSideSection from "../Components/Home/RightSideSection";
document.title = "Medium Clone";

const Home = ({ setFullBookmarks, fullBookmarks }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [allBookedBlogs, setAllBookedBlogs] = useState([]);
  const { isLoading } = useQuery(
    ["fetchingAllBlogs"],
    () => {
      return axios.get("/blogs/", {
        headers: {
          userId: localStorage.getItem("blogUserId")
            ? localStorage.getItem("blogUserId")
            : "",
        },
      });
    },
    {
      onSuccess: (res) => {
        console.log(res.data);
        setAllBlogs([...res.data.blogs]);
        setAllBookedBlogs([...res.data.allBlogList]);
        setFullBookmarks([...res.data.bookmarks.bookmarks]);
        const bookmarks = [...res.data.bookmarks.bookmarks];
        bookmarks.forEach((el) => {
          const catName = `${el.category.title.split(" ").join(".")}.Bookmark`;
          let blogsList = [...el.category.blogs];
          let blogsId = [];
          blogsList.forEach((blog) => {
            blogsId.push(blog._id);
          });
          localStorage.setItem(catName, `${blogsId.toString()}`);
        });
      },
      onError: (res) => {
        toast.error("Something went wrong");
      },
    }
  );
  return (
    <div>
      <Navbar />
      <div className="flex ">
        {/* Main Content */}
        <div className="max-w-[1000px] w-full sticky top-0">
          <div className="pt-5 max-w-[700px] w-full mx-auto pb-5">
            {isLoading ? (
              <div className="flex justify-center items-center w-[50vw] h-[70vh]">
                <PropagateLoader />
              </div>
            ) : (
              allBlogs.map((blog, index) => {
                return (
                  <BlogCard
                    key={index}
                    blog={blog}
                    allBookedBlogs={allBookedBlogs}
                    fullBookmarks={fullBookmarks}
                  />
                );
              })
            )}
          </div>
        </div>
        <RightSideSection />
      </div>
    </div>
  );
};

export default Home;
