import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postApi } from "../api/post-api";

// entities/post/model (бо його часто будуть використовувати features)
const postKeys = {
  all: ["posts"] as const,
  detail: (id: number) => ["posts", id] as const,
};

// entities/post/model (бо це читання)
export const usePosts = () => {
  return useQuery({
    queryKey: postKeys.all,
    queryFn: postApi.getPosts,
    select: (posts) => [...posts].reverse(),
  });
};

// features/create-post + ui(optianal)
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
};
// features/complete-post + ui(optianal)
export const useCompletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.complete,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
};
// features/delete-post + ui(optianal)
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
};
