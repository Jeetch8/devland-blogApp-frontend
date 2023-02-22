import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseDomain } from "../../Utills/baseDomain";

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    getBookmarks();
  }, []);

  const getBookmarks = async () => {
    const data = await axios.get(baseDomain + "/api/v1/user/getAllBookmarks", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("blogToken")}`,
      },
    });
    const bookmarks = await data.data?.bookmarks;
    setBookmarks(bookmarks);
    console.log(bookmarks);
  };

  return (
    <div>
      <div>Bookmarks</div>
    </div>
  );
};

export default Bookmark;
