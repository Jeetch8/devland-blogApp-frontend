import { Grid } from "@mui/material";
import BlogCard from "../components/BlogCard";
import { useState } from "react";

const Home = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  return (
    <div>
      <Grid>{/* <BlogCard  />     */}</Grid>
    </div>
  );
};

export default Home;
