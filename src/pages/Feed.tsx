import { PostList } from "@/components/PostList/PostsList";
import { CreatePost } from "@/components/create-post/CreatePost";

function Feed() {
  return (
    <div>
      <CreatePost />
      <PostList />
    </div>
  );
}

export default Feed;
