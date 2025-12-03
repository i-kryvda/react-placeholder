import type { PostItem } from "@app/store/posts/posts.types";

export const api = {
  url: "https://jsonplaceholder.typicode.com",

  getPost: async (): Promise<PostItem[]> => {
    const response = await fetch(api.url + "/posts");
    if (!response.ok) throw new Error("Network response");
    const data: PostItem[] = await response.json();
    return data;
  },
};
