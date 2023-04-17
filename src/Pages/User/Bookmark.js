import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseDomain } from "../../Utills/baseDomain";
import AllBlogsSection from "../../Components/HomePage/AllBlogsSection";
import { useQuery } from "@tanstack/react-query";

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);

  const { isFetching, isLoading } = useQuery(
    ["bookmarks"],
    async () => {
      return await axios.get(baseDomain + "/api/v1/user/getAllBookmarks", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("blogToken")}`,
        },
      });
    },
    {
      onSuccess: (data) => {
        console.log(data.data);
        setBookmarks(data.data.bookmarks);
      },
    }
  );

  return (
    <div>
      <div className="mt-4">
        <h1 className="text-xl text-center">Bookmarks</h1>
      </div>
      <AllBlogsSection
        allBlogs={bookmarks}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Bookmark;
