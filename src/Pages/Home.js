import React from "react";
import Navbar from "../Components/Global/Navbar";
import BlogCard from "../Components/Home/BlogCard";

const Home = () => {
  const blogs = [12, 31, 23, 12, 3, 12312, 1, 3, 12, 312];
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        {/* Main Content */}
        <div className="px-10 pt-5 max-w-[690px]">
          {blogs.map(() => {
            return <BlogCard />;
          })}
        </div>
        {/* Side Overview */}
        <div className="border-l-[1px] border-slate-200">a</div>
      </div>
    </div>
  );
};

export default Home;

// https://brandslogos.com/wp-content/uploads/images/large/medium-logo.png
