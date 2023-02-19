import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Drawer from "../../Components/Drawer";
import AllBlogsSection from "../../Components/HomePage/AllBlogsSection";
import NavBar from "../../Components/HomePage/GlobalComponents/NavBar";
import axios from "axios";
import { FaTwitter } from "react-icons/fa";
import { BsGithub, BsInstagram } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useJwt } from "react-jwt";
import { Navigate } from "react-router-dom";

function HomePage() {
  const [allBlogs, setAllBlogs] = useState([]);
  const token = localStorage.getItem("blogToken");
  const { isExpired, decodedToken } = useJwt(token);
  useEffect(() => {
    if (token) {
      if (isExpired) {
        toast.error("Session expired");
        toast.loading("Redirecting to login page");
        setTimeout(() => {
          Navigate("/login");
        }, 3000);
        return;
      }
      console.log(isExpired);
      console.log(decodedToken);
    } else {
      toast.error("Not authorized to page");
      toast.loading("Redirecting to login page");
      setTimeout(() => {
        Navigate("/login");
      }, 3000);
    }
  }, []);
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
