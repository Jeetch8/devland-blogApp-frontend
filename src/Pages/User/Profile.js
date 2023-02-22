import React, { useEffect, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import axios from "axios";
import { baseDomain } from "../../Utills/baseDomain";

const Profile = () => {
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    profileImg: "",
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const res = await axios.get(baseDomain + "/api/v1/user/getOwnProfile", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("blogToken")}`,
      },
    });
    const user = await res.data?.user;
    setUserState(user);
  };

  return (
    <div className="max-w-[70vw] border-x-[2px] border-zinc-400 mx-auto  gap-y-[10px]">
      <div className="grid grid-cols-[1fr,1fr] mx-[3vw] justify-center items-center">
        <h3 className="font-semibold">Profile image: </h3>
        <div
          className={`border-black border-[1px] p-1 rounded-full w-[135px] h-[135px] relative bg-no-repeat bg-center bg-[url(${
            userState.profileImg
              ? userState.profileImg
              : "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=135&h=135&dpr=1"
          })] my-[40px]`}
        >
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
          value={userState.name}
          className="border-[1px] py-2 pl-2 pr-4 rounded-lg my-[20px]"
          onChange={(e) => setUserState({ ...userState, name: e.target.value })}
        />
        <h3>Email:</h3>
        <input
          type="text"
          value={userState.email}
          className="border-[1px] py-2 pl-2 pr-4 rounded-lg my-[20px]"
          onChange={(e) =>
            setUserState({ ...userState, email: e.target.value })
          }
        />
        <h2 className="col-span-2 my-[20px]">
          Looking to change password,{" "}
          <a href="" className="text-blue-500 underline">
            click here
          </a>
        </h2>
      </div>
    </div>
  );
};

export default Profile;
