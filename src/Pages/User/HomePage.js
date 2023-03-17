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
import { useNavigate } from "react-router-dom";
import { baseDomain } from "../../Utills/baseDomain";

function HomePage() {
  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState([]);
  const token = localStorage.getItem("blogToken");
  const [searchQuery, setSearchQuery] = useState("");
  const { isExpired } = useJwt(token);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    if (token) {
      if (isExpired) {
        toast.error("Session expired");
        toast.loading("Redirecting to login page");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        return;
      }
    } else {
      toast.error("Not authorized to page");
      toast.loading("Redirecting to login page");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, []);

  const { isFetching, isLoading, refetch } = useQuery(
    ["fetchAllBlogs"],
    () => {
      if (searchQuery)
        return axios.get(
          `${baseDomain}/api/v1/blogs/search?searchQuery=${searchQuery}`
        );
      return axios.get(`${baseDomain}/api/v1/blogs`);
    },
    {
      onSuccess: (data) => {
        setAllBlogs([...data.data.blogs]);
      },
    }
  );

  return (
    <div className="font-libre">
      <NavBar
        setShowDrawer={setShowDrawer}
        showDrawer={showDrawer}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        refetch={refetch}
      />
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
