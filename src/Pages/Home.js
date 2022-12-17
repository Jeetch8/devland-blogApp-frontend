import React, { useEffect } from "react";
import Navbar from "../Components/Global/Navbar";
import BlogCard from "../Components/Home/BlogCard";
import RightSideSection from "../Components/Home/RightSideSection";
document.title = "Medium Clone";

const Home = () => {
  useEffect(() => {
    fetch("https://blue-green-sea-lion-garb.cyclic.app/").then("Fetched");
  }, []);

  const blogs = [12, 31, 23, 12, 3, 12312, 1, 3, 12, 312];
  return (
    <div>
      <Navbar />
      <div className="flex ">
        {/* Main Content */}
        <div className="max-w-[1000px] w-full sticky top-0">
          <div className="pt-5 max-w-[700px] w-full mx-auto pb-5">
            {blogs.map(() => {
              return <BlogCard />;
            })}
          </div>
        </div>
        {/* Side Overview */}
        {/* <div className="border-l-[1px] border-slate-200">a</div> */}
        <RightSideSection />
      </div>
    </div>
  );
};

export default Home;
