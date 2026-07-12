import type { CompletePostPayload, CreatePostsPayload, DeletePostPayload, Post } from "../types/posts";
import { api } from "./axios";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const postApi = {
  getPosts: async () => {
    const res = await api.get<Post[]>("/posts");
    // await delay(2000);
    return res.data;
  },

  create: async (payload: CreatePostsPayload): Promise<Post> => {
    const res = await api.post("/posts", { ...payload, completed: false });
    return res.data;
  },

  complete: async ({ id, completed }: CompletePostPayload) => {
    const res = await api.patch(`/posts/${id}`, { completed });
    return res.data;
  },

  delete: async ({ id }: DeletePostPayload) => {
    const res = await api.delete(`/posts/${id}`);
    return res.data;
  },
};
