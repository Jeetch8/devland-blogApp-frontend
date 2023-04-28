import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CustomAxiosAuth } from "../utils/CustomAxios";
import { useGlobalContext } from "../context/GlobalContext";
import { Box, Button, Container, Divider } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CommentDrawer from "../components/CommentsDrawer";

const SingleBlog = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const blogSlug = path[2];
  let blogSlugArr = blogSlug.split("-");
  let blogId = blogSlugArr[blogSlugArr.length - 1];
  console.log(blogId);
  const { user } = useGlobalContext();

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      const { data } = await CustomAxiosAuth(user?.token as string).get(
        `http://localhost:5000/api/v1/blog/${blogId}`
      );
      console.log(data);
      return data;
    },
  });

  let blog = data?.blog?.blog;

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      <Box maxWidth={"50vw"} margin={"0 auto"}>
        {blog && (
          <>
            <h1>{blog.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 5px",
              }}
            >
              <Button
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <FavoriteBorderIcon />
                <span>{blog.number_of_likes}</span>
              </Button>
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <BookmarkBorderIcon />
                </Box>
                <Button sx={{ display: "flex", alignItems: "center" }}>
                  <CommentDrawer />
                  <span>{blog.number_of_comments}</span>
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default SingleBlog;
