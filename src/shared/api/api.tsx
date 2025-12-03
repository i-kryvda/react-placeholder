import type { PostItem } from "@app/store/posts/posts.types";

export const api = {
  getPost: async (): Promise<PostItem[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) throw new Error("Network response");
    const data: PostItem[] = await response.json();
    return data;
  },
};
