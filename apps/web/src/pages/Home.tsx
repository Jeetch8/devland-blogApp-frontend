import { Grid } from "@mui/material";
import BlogCard from "../components/BlogCard";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IAllBlogsRes } from "../interfaces/blog.interface";

const fetchPage = async (pageParam = 0): Promise<IAllBlogsRes> => {
  const res = await fetch(
    `http://localhost:5000/api/v1/blog?page=${pageParam}`
  );
  return await res.json();
};

const Home = () => {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data,
  } = useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: ({ pageParam }: { pageParam: number }) => fetchPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.nextCursor,
    getPreviousPageParam: (
      firstPage,
      allPages,
      firstPageParam,
      allPageParams
    ) => firstPage.prevCursor,
  });
  console.log(data);

  // useEffect(() => {
  //   fetchNextPage();
  //   console.log(data?.pages);
  // }, [data]);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.offsetHeight;
    if (
      scrollPosition >= documentHeight * 0.9 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage(); // Fetch next page when user scrolls to 90% of the document height
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        {data &&
          data?.pages.map((page: IAllBlogsRes) =>
            page.blogs.map((obj, ind) => (
              <Grid item xs={12} sm={6} md={4} key={obj.id}>
                <BlogCard obj={obj} />
              </Grid>
            ))
          )}
      </Grid>
    </div>
  );
};

export default Home;
