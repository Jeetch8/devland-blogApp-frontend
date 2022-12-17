import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Global/Navbar";
import StoriesBlogs from "./StoriesBlogs";
import RightSideSection from "../Home/RightSideSection";
document.title = "Your stories";

const Drafts = () => {
  const location = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();
  const blogs = [23, 12, 3, 12, 3, 123, 123];
  return (
    <div>
      <Navbar />
      <div className="flex w-full">
        <div className="max-w-[1100px] w-full">
          <div className="max-w-[700px] m-auto">
            <div className="flex items-center justify-between my-[50px]">
              <h1 className="text-[42px] font-bold">Your stories</h1>
              <button
                onClick={() => navigate("/writeblog")}
                className="bg-[#1A8917] py-2 px-5 text-[14px] rounded-full text-white font-medium"
              >
                Write a story
              </button>
            </div>
            <div className="flex border-b-[1px] border-zinc-300">
              <button
                className={
                  location === "drafts"
                    ? "border-x-0 border-t-0 border-b-black border-[1px] outline-none py-2 mr-6"
                    : "border-x-0 border-t-0 outline-none py-2 mr-6"
                }
                onClick={() => navigate("/me/stories/drafts")}
              >
                Draft
              </button>
              <button
                onClick={() => navigate("/me/stories/published")}
                className={
                  location === "published"
                    ? "border-x-0 border-t-0 border-b-black border-[1px] outline-none py-2 mr-6"
                    : "border-x-0 border-t-0 outline-none py-2 mr-6"
                }
              >
                Published
              </button>
            </div>
            {blogs.map(() => {
              return <StoriesBlogs />;
            })}
          </div>
        </div>
        <div>
          <RightSideSection />
        </div>
      </div>
    </div>
  );
};

export default Drafts;
