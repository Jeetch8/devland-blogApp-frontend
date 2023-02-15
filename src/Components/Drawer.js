import React from "react";
import { RxCross2 } from "react-icons/rx";

const Drawer = ({ setShowDrawer, showDrawer }) => {
  return (
    <div className="w-[98.9vw] h-[100vh] bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 overflow-x-hidden animate-slideIn">
      <div className="w-[25vw] bg-white h-[100vh] ml-auto">
        <div className="flex justify-end p-3">
          <button onClick={() => setShowDrawer(!showDrawer)}>
            <RxCross2 className="text-[25px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
