import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import Editor from "../components/Editor";
import { MouseEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CustomAxiosAuth } from "../utils/CustomAxios";
import { useGlobalContext } from "../context/GlobalContext";
import toast from "react-hot-toast";

enum BlogSubmitType {
  DRAFT = "draft",
  PUBLISH = "publish",
}

const WriteBlog = () => {
  const [blogSubmitType, setBlogSubmitType] = useState<BlogSubmitType>(
    BlogSubmitType.DRAFT
  );
  const [blogContent, setBlogContent] = useState("");
  const [blogtitle, setBlogTitle] = useState("");
  const { user } = useGlobalContext();

  const handleBlogSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!blogContent || blogContent.length === 0)
      toast.error("Please write something");
    const { data } = await CustomAxiosAuth(user?.token).post("/blog", {
      title: blogtitle,
      content: blogContent,
      type: blogSubmitType,
    });
    console.log(data);
  };

  return (
    <div>
      <div>
        <Box
          sx={{
            width: "100%",
            maxWidth: "1000px",
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 30px",
          }}
        >
          <TextField
            placeholder="Title"
            size="small"
            label="Title"
            variant="standard"
            onChange={(e) => setBlogTitle(e.target.value)}
            value={blogtitle}
          />
          <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Select
              size="small"
              value={blogSubmitType}
              label="blog_submit_type"
              id="blog_submit_type"
            >
              <MenuItem value={BlogSubmitType.DRAFT}>Draft</MenuItem>
              <MenuItem value={BlogSubmitType.PUBLISH}>Publish</MenuItem>
            </Select>
            <Button
              variant="contained"
              color="success"
              onClick={handleBlogSubmit}
              disabled={blogContent.length === 0}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </div>
      <Editor blogContent={blogContent} setBlogContent={setBlogContent} />
    </div>
  );
};

export default WriteBlog;
