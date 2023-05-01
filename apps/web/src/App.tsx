import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomeLayout from "./layouts/HomeLayout";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Home from "./pages/Home";
import WriteBlog from "./pages/WriteBlog";
import SingleBlog from "./pages/SingleBlog";
import Bookmark from "./pages/Bookmark";
import BookmarkBlogs from "./pages/BookmarkBlogs";

const App = () => {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="blog/:id" element={<SingleBlog />} />
        <Route path="bookmarks" element={<Bookmark />} />
        <Route path="/bookmark/:categoryId" element={<BookmarkBlogs />} />
      </Route>
      <Route path="write" element={<WriteBlog />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default App;
