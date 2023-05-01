export interface IBookmarkCategoryCreate_dao {
  name: string;
  description: string;
  userId: string;
}

export interface IBookmarkCategoryUpdate_dao {
  categoryId: string;
  name: string;
  description: string;
}

export interface IBookmarkBlogCreate_dao {
  categoryId: string;
  blogId: string;
  note: string;
}
