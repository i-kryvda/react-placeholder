import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./store/store";
import { fetchPosts } from "./store/posts/posts.async";
import { removePost } from "./store/posts/posts.slice";
import { increment } from "./store/couter/couter.slice";
import { multiplyAction } from "./store/couter/couter.actions";

export default function App() {
  const { posts, loading, error } = useAppSelector((state) => state.posts);
  const { value } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <header className="header">
        <div className="header__container">header</div>
      </header>
      <main className="main">
        <div className="main__container">
          <div className="counter">
            <button type="button" onClick={() => dispatch(increment())}>
              PLUS
            </button>
            <button type="button" onClick={() => dispatch(multiplyAction(2))}>
              MINUS
            </button>
            <div className="counter__value">{value}</div>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {posts.map((post) => (
            <div key={post.id} onClick={() => dispatch(removePost(post.id))}>
              {post.id}: {post.title}
            </div>
          ))}
        </div>
      </main>
      <footer className="footer">
        <div className="footer__container">footer</div>
      </footer>
    </>
  );
}
