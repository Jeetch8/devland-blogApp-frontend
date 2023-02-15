import React, { useState } from "react";
import JoditEditor from "jodit-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AiOutlineUpload } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const WriteBlog = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [blogImg, setBlogImg] = useState("");
  const [title, setTitle] = useState("");
  const [blogStatus, setBlogStatus] = useState("published");

  const { mutate } = useMutation(
    ["createNewBlog"],
    () => {
      return axios.post(
        "/blogs/createNewBlog",
        { HTMLBody: content, blogImg, title, status: blogStatus },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("blogToken"),
          },
        }
      );
    },
    {
      onSuccess: (data) => {
        if (!data.data.success) return;
        toast.success("New Blog created Successfully");
        toast.loading("Redirecting to Home page");
        setTimeout(() => {
          toast.dismiss();
          navigate("/");
        }, 4000);
      },
      onError: (res) => {
        console.log(res);
        toast.error("something went wrong, please try again");
      },
    }
  );

  const handleImageChange = (e) => {
    const img = e.target.files[0];
    let imgData = new FormData();
    imgData.append("image", img);
    axios
      .post("/imageUpload/imagaeUploadCloudniary", imgData)
      .then((res) => setBlogImg(res.data.image.src));
  };

  const handleBlogSubmit = (status) => {
    setBlogStatus(status);
    if (content === "" || blogImg === "" || title === "" || blogStatus === "") {
      toast.error("All fields are mandatory");
      return;
    }
    mutate();
  };

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex justify-between">
        <img
          src="https://i.ibb.co/DzZKZHY/medium-icon-white-on-black.png"
          alt="logo"
          width={60}
          height={60}
        />
        <div className="flex items-center gap-3 text-[13px]">
          <button
            className="py-1 h-fit border-[1px] borde-solid-black rounded-full px-3"
            onClick={() => handleBlogSubmit("draft")}
          >
            Draft
          </button>
          <button
            className="bg-[#1A8917] py-1 px-2 rounded-full h-fit text-white"
            onClick={() => handleBlogSubmit("published")}
          >
            Publish
          </button>
        </div>
      </div>
      {/* Blog Image */}
      <div className="h-[35vh] w-[40vw] border-black border-dashed border-2 rounded-md my-2 ml-4">
        {blogImg ? (
          <div>
            <img
              src={blogImg}
              alt=""
              className="object-contain h-[34.5vh] w-[40vw]"
            />
          </div>
        ) : (
          <div className="h-full">
            <label htmlFor="imageUpload" className="h-full cursor-pointer">
              <div className="text-[50px] flex items-center justify-center h-full">
                <div className="text-center">
                  <AiOutlineUpload className="mx-auto" />
                  <h2 className="text-[15px] text-center">Upload blog Image</h2>
                </div>
              </div>
            </label>
            <input
              type="file"
              className="hidden"
              id="imageUpload"
              accept="image/*"
              onChange={(e) => handleImageChange(e)}
            />
          </div>
        )}
      </div>
      {/* Title */}
      <input
        type={"text"}
        placeholder="Title"
        className="text-[22px] my-4 mx-4 py-2 w-[83vw] pl-1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="mx-4">
        <JoditEditor onBlur={(e) => setContent(e)} value={content} />
      </div>
      <Toaster />
    </div>
  );
};

export default WriteBlog;
