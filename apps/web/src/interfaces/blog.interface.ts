export interface IBlog {
  id: number;
  title: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
}

export interface IAllBlogsRes {
  blogs: IBlog[];
  prevCursor: number;
  nextCursor: number;
}
