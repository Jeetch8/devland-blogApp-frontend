import React, { useEffect, useState } from "react";
import Navbar from "../Components/Global/Navbar";
import BookmarkCards from "../Components/Bookmark/BookmarCards";
import axios from "axios";
import { Modal } from "react-responsive-modal";

const Bookmarks = ({ fullBookmarks, setFullBookmarks }) => {
  const [modalState, setModalState] = useState(false);
  useEffect(() => {
    if (fullBookmarks.length === 0 && localStorage.getItem("blogUserId")) {
      axios
        .get("/user/getAllBookmarks", {
          headers: {
            userId: localStorage.getItem("blogUserId"),
          },
        })
        .then((res) => setFullBookmarks([...res.data.bookmarks]));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-[1100px]">
        <div className="max-w-[700px] m-auto">
          <div className="flex items-center justify-between my-[60px]">
            <Modal
              open={modalState}
              onClose={() => setModalState(false)}
              center={true}
            >
              <p>askdjakds</p>
            </Modal>
            <h2 className="text-[40px] font-bold">Your lists</h2>
            <button
              className="bg-[#1A8917] py-2 px-4 rounded-full text-white font-medium"
              onClick={() => setModalState(true)}
            >
              New list
            </button>
          </div>
          {fullBookmarks.map((cat, index) => {
            return <BookmarkCards cat={cat} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
