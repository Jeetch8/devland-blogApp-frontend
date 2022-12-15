import { Routes, Route } from "react-router-dom";
import Bookmarks from "./Pages/Bookmarks";
import Home from "./Pages/Home";
import WriteBlog from "./Pages/WriteBlog";
import NotFoundPage from "./Pages/NotFoundPage";
import Notifications from "./Pages/Notifications";
import Drafts from "./Components/Stories/Drafts";
import Published from "./Components/Stories/Published";
import SingleBlog from "./Pages/SingleBlog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/writeblog" element={<WriteBlog />} />
      <Route path="/me/lists" element={<Bookmarks />} />
      <Route path="/me/stories/drafts" element={<Drafts />} />
      <Route path="/me/stories/published" element={<Published />} />
      <Route path="/blog/:blogId" element={<SingleBlog />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
