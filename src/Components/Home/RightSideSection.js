import React from "react";

const RightSideSection = () => {
  const blogs = [123, 1, 23];
  return (
    <div className="border-l-[1px] border-slate-200 pt-6 pl-8 max-w-[330px]">
      <h2 className="font-medium mb-8">Recommended to read</h2>
      {blogs.map(() => {
        return (
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <img
                className="overflow-hidden rounded-full h-[22px] w-[22px]"
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                alt="profileImg"
              />
              <h3 className="text-[14px] font-medium ml-2">Zulie Rane</h3>
            </div>
            <h2 className="font-bold text-[15px] max-w-[300px]">
              22 Tips That Helped Me Save Time, Money and Improve My Mental
              Healt in 2022
            </h2>
          </div>
        );
      })}
      <h2 className="font-medium mb-4 mt-14">Who to follow</h2>
      {blogs.map(() => {
        return (
          <div className="flex justify-between mb-3">
            <div className="flex items-start">
              <img
                className="overflow-hidden rounded-full h-[38px] w-[40px]"
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                alt="profileImg"
              />
              <div className="ml-3">
                <h3 className="text-[14px] font-bold">Zulie Rane</h3>
                <h3 className="text-[13px] max-w-[200px]">
                  Software Architect, Node.js Specialist. Consultant...
                </h3>
              </div>
            </div>
            <button className="border-2 border-solid-black rounded-full px-3 text-[14px] py-1 h-fit">
              Follow
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default RightSideSection;
