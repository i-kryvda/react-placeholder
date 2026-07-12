import {
  useCompletePost,
  useDeletePost,
  usePosts,
} from "@/shared/hooks/post-query";

import styles from "./PostsList.module.scss";

export function PostList() {
  const { data: posts = [] } = usePosts();

  const completePostMutation = useCompletePost();
  const deletePostMutation = useDeletePost();

  const handleCompletePost = (id: number, completed: boolean) => {
    completePostMutation.mutate({
      id,
      completed,
    });
  };

  const handleDeletePost = (id: number) => {
    deletePostMutation.mutate({ id });
  };

  return (
    <ul className={styles.list}>
      {posts.map((item, index) => (
        <li
          key={item.id}
          className={`${styles.item} ${item.completed ? styles.itemCompleted : ""}`}
        >
          <span className={styles.index}>{index + 1}</span>
          <p
            className={`${styles.title} ${item.completed ? styles.titleCompleted : ""}`}
          >
            {item.title}
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.toggleButton} ${item.completed ? styles.toggleButtonDone : styles.toggleButtonPending}`}
              onClick={() => handleCompletePost(item.id, !item.completed)}
            >
              {item.completed ? "YES" : "NO"}
            </button>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => handleDeletePost(item.id)}
            >
              delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
