import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CustomAxiosAuth } from "../utils/CustomAxios";
import { useGlobalContext } from "../context/GlobalContext";
import { Box, Container, Divider, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CommentDrawer from "../components/CommentsDrawer";
import BlogLikesDrawer from "../components/blogLikesDrawer";

const SingleBlog = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const blogSlug = path[2];
  let blogSlugArr = blogSlug.split("-");
  let blogId = blogSlugArr[blogSlugArr.length - 1];
  const { user } = useGlobalContext();

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      const { data } = await CustomAxiosAuth(user?.token as string).get(
        `http://localhost:5000/api/v1/blog/${blogId}`
      );
      return data;
    },
  });

  let blog = data?.blog;

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      <Box maxWidth={"50vw"} margin={"0 auto"}>
        {blog && (
          <>
            <h1>{blog.title}</h1>
            <Box dangerouslySetInnerHTML={{ __html: blog.content }}></Box>
            <Divider sx={{ paddingTop: "20px" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 5px",
              }}
            >
              <BlogLikesDrawer
                hasUserLikedBlog={blog.hasUserLikedBlog}
                likesList={blog.likes}
                numberOfLikes={blog.number_of_likes}
                blogId={blogId}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <IconButton>
                  <BookmarkBorderIcon />
                </IconButton>
                <CommentDrawer
                  numberOfComments={blog.number_of_comments}
                  blogId={blogId}
                  commentsList={blog.comments}
                />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default SingleBlog;
