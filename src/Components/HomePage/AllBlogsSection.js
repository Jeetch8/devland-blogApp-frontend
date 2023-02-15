import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { convert } from "html-to-text";
import { SlHeart } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const AllBlogsSection = ({ allBlogs, isFetching, isLoading }) => {
  const navigate = useNavigate();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  if (isFetching || isLoading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <HashLoader />
      </div>
    );
  }

  return (
    <div className="mx-[10vw] my-[5vh] mt-[7vh]">
      <ResponsiveMasonry columnsCountBreakPoints={breakpointColumnsObj}>
        <Masonry columnsCount={3} gutter="50px">
          {allBlogs?.map((blog) => {
            return (
              <div className=" border-b-[1px] pb-8" key={blog._id}>
                <img
                  src={blog.blogImg}
                  alt=""
                  className="rounded-md mb-[15px] cursor-pointer"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                />
                <div className="flex justify-between text-zinc-500 my-4">
                  <h4>21 Dec 2021</h4>
                  <div className="flex items-baseline gap-1">
                    <SlHeart />
                    32
                  </div>
                </div>
                <h4
                  className=" font-bold text-[20px] hover:text-cyan-600 cursor-pointer"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                >
                  {blog.title}
                </h4>
                <h3 className="text-[15px]">
                  {convert(blog.HTMLBody).substring(0, 215)}
                </h3>
              </div>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default AllBlogsSection;
