import React from "react";
import { Route, Routes } from "react-router-dom";
import Bookmark from "./Pages/User/Bookmark";
import HomePage from "./Pages/User/HomePage";
import Login from "./Pages/User/Login";
import NotFound from "./Pages/User/NotFound";
import Profile from "./Pages/User/Profile";
import Register from "./Pages/User/Register";
import SingleBlog from "./Pages/User/SingleBlog";
import WriteBlog from "./Pages/User/WriteBlog";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookmarks" element={<Bookmark />} />
        <Route path="/register" element={<Register />} />
        <Route path="/writeblog" element={<WriteBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog/:blogId" element={<SingleBlog />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
