import { useState } from "react";
import { useCreatePost } from "@/shared/hooks/post-query";

import styles from "./CreatePost.module.scss";

export function CreatePost() {
  const createPostMutation = useCreatePost();
  const [value, setValue] = useState("");

  const handleCreatePost = () => {
    createPostMutation.mutate({
      title: value.trim(),
    });
    setValue("");
  };

  return (
    <>
      <form action="#" className={styles.form}>
        <input
          type="text"
          placeholder="aadfasdfsd"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className={styles.input}
        />

        <button
          type="submit"
          onClick={handleCreatePost}
          className={styles.create}
        >
          Create Post
        </button>
      </form>
    </>
  );
}
