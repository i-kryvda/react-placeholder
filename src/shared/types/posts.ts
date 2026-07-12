export type Post = {
  id: number;
  title: string;
  completed: boolean;
};

// rename CreatePostsDto ✔ (також добре)
export type CreatePostsPayload = Pick<Post, "title">;

export type CompletePostPayload = Pick<Post, "id" | "completed">;

export type DeletePostPayload = Pick<Post, "id">;
