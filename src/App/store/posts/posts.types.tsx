export type PostItem = {
  id: number;
  title: string;
  body: string;
};

export type PostsState = {
  posts: PostItem[];
  loading: boolean;
  error: string | null;
};
