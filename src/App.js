import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import WriteBlog from "./Pages/WriteBlog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/writeblog" element={<WriteBlog />} />
    </Routes>
  );
}

export default App;
