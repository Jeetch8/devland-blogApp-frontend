import { Box, Grid } from "@mui/material";
import BlogCard from "../components/BlogCard";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IAllBlogsRes } from "../interfaces/blog.interface";

const fetchPage = async (pageParam = 0): Promise<IAllBlogsRes> => {
  const res = await fetch(
    `http://localhost:5000/api/v1/blog?page=${pageParam}`
  );
  const json = await res.json();
  return json;
};

const Home = () => {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    data,
  } = useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: ({ pageParam }: { pageParam: number }) => fetchPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage?.nextCursor > allPages.length;
      return morePagesExist ? lastPage?.nextCursor : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      const prevPageExists = firstPage?.prevCursor >= 0;
      return prevPageExists ? firstPage?.prevCursor : undefined;
    },
  });

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.offsetHeight;
    if (scrollPosition >= documentHeight * 0.85 && !isFetchingNextPage) {
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
    <Box sx={{ padding: "30px 40px 10px 40px" }}>
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
      <Grid sx={{ display: "flex", justifyContent: "center", font: "20px" }}>
        <p>{!hasNextPage && "No more blogs to show"}</p>
      </Grid>
    </Box>
  );
};

export default Home;
