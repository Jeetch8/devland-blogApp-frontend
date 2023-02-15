import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Drawer from "../../Components/Drawer";
import AllBlogsSection from "../../Components/HomePage/AllBlogsSection";
import NavBar from "../../Components/HomePage/GlobalComponents/NavBar";
import axios from "axios";
import { FaTwitter } from "react-icons/fa";
import { BsGithub, BsInstagram } from "react-icons/bs";

function HomePage() {
  const [allBlogs, setAllBlogs] = useState([]);
  const { isFetching, isLoading } = useQuery(
    ["fetchAllBlogs"],
    () => {
      return axios.get(
        "https://blue-green-sea-lion-garb.cyclic.app/api/v1/blogs"
      );
    },
    {
      onSuccess: (data) => {
        setAllBlogs([...data.data.blogs]);
      },
    }
  );
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <div className="font-libre">
      <NavBar setShowDrawer={setShowDrawer} showDrawer={showDrawer} />
      <AllBlogsSection
        allBlogs={allBlogs}
        isFetching={isFetching}
        isLoading={isLoading}
      />
      {showDrawer && (
        <Drawer setShowDrawer={setShowDrawer} showDrawer={showDrawer} />
      )}
      <footer className="bg-[#FAFAFA] h-[5vh] flex justify-center items-center py-16">
        <div>
          <h4 className="flex items-center">Made by Jeet Chawda</h4>
          <div className="flex gap-4 justify-center text-[20px] mt-1">
            <BsInstagram />
            <BsGithub />
            <FaTwitter />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
