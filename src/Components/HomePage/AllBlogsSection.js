import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Products from "../../Products.json";

const AllBlogsSection = () => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <div className="mx-[10vw] my-[5vh] mt-[7vh]">
      <ResponsiveMasonry columnsCountBreakPoints={breakpointColumnsObj}>
        <Masonry columnsCount={3} gutter="100px">
          {Products?.map((product) => {
            return (
              <div className="">
                <img src={product.image} alt="" />
                <h4 className=" font-bold text-lg">{product.title}</h4>
                <div className="flex justify-between">
                  <h3 className="max-w-[15vw]">{product.description}</h3>
                  <div>
                    <h3>{product.price}</h3>
                    <h3>{product.rating.count}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default AllBlogsSection;
