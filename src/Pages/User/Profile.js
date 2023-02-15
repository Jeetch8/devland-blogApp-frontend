import React, { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";

const Profile = () => {
  const [name, setName] = useState("Jeet Chawda");
  const [email, setEmail] = useState("JeetKumar0898@gmail.com");
  const [currentVis, setCurrentVis] = useState("Published");
  return (
    <div className="max-w-[70vw] border-x-[2px] border-zinc-400 mx-auto  gap-y-[10px]">
      <div className="grid grid-cols-[1fr,1fr] mx-[3vw] justify-center items-center">
        <h3 className="font-semibold">Profile image: </h3>
        <div className="border-black border-[1px] p-1 rounded-full w-[135px] h-[135px] relative bg-no-repeat bg-center bg-[url(https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=135&h=135&dpr=1)] my-[40px]">
          <label
            htmlFor="peofileInput"
            className="border-[1px] border-black w-[25px] h-[25px] absolute rounded-full p-1 bottom-2 right-3 bg-white cursor-pointer"
          >
            <HiOutlinePencil />
            <input type="file" id="peofileInput" className="hidden" />
          </label>
        </div>
        <h3>Name:</h3>
        <input
          type="text"
          value={name}
          className="border-[1px] py-2 pl-2 pr-4 rounded-lg my-[20px]"
          onChange={(e) => setName(e.target.value)}
        />
        <h3>Email:</h3>
        <input
          type="text"
          value={email}
          className="border-[1px] py-2 pl-2 pr-4 rounded-lg my-[20px]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <h2 className="col-span-2 my-[20px]">
          Looking to change password,{" "}
          <a href="" className="text-blue-500 underline">
            click here
          </a>
        </h2>
      </div>
      <div>
        <h1 className="text-[30px] font-semibold mt-[10vh] ml-[40px] mb-[20px]">
          Blogs
        </h1>
        <div className="flex border-b-[2px] border-zinc-300 max-w-[50vw] pr-4 ml-[40px]">
          <h3
            onClick={() => setCurrentVis("Published")}
            className={
              currentVis === "Published"
                ? "border-b-[2px] border-black mr-6 py-3 cursor-pointer"
                : "mr-6 py-3 cursor-pointer"
            }
          >
            Published
          </h3>
          <h3
            onClick={() => setCurrentVis("Drafts")}
            className={
              currentVis === "Drafts"
                ? "border-b-[2px] border-black mx-6 py-3 cursor-pointer"
                : "mx-6 py-3 cursor-pointer"
            }
          >
            Drafts
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
