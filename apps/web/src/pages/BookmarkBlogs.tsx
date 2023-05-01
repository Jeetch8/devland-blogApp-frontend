interface Query {
  data: {
    blogs: bookmark_category_blog[];
  };
}

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CustomAxiosAuth } from "../utils/CustomAxios";
import { useGlobalContext } from "../context/GlobalContext";
import { bookmark_category_blog } from "./Bookmark";
import BlogCard from "../components/BlogCard";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";

const BookmarkBlogs = () => {
  const { user } = useGlobalContext();
  const { categoryId } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading, isFetching } = useQuery<Query>({
    queryKey: ["categoryBlogs", categoryId],
    queryFn: () =>
      CustomAxiosAuth(user?.token as string).get(
        `/bookmark/category/${categoryId}/blog`
      ),
  });

  if (isLoading || isFetching) return <div>Loading...</div>;

  console.log(data?.data);
  return (
    <Box sx={{ padding: "30px 10px" }}>
      <Typography variant="h4" sx={{ ml: 10, mb: 5 }}>
        Bookmark Blogs
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
        }}
      >
        {data?.data.blogs.map((obj) => {
          return (
            <Box key={obj.id}>
              <Paper elevation={8} sx={{ padding: "20px 10px" }}>
                {isEditing ? (
                  <input type="text" value={obj.note} />
                ) : (
                  <Typography onClick={() => setIsEditing(true)}>
                    <span style={{ fontWeight: 600 }}>NOTES:</span>
                    {obj.note}
                  </Typography>
                )}
              </Paper>
              <BlogCard obj={obj.blog} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default BookmarkBlogs;
