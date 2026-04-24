import { useEffect, useState } from "react";
import "./App.scss";

// entities/todos/model/types
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

// shared/api
const apiFetch = async (url: string, options: RequestInit = {}) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    return res.json();
  });
};

// entities/todos/api
const getData = async () => {
  const res: Todo[] = await apiFetch(
    "https://jsonplaceholder.typicode.com/todos",
  );
  return res;
};

// entities/todos/model
const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: Todo[] = await getData();
      setTodos(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, error, loading };
};

// TodoItem: entities/todos/ui/TodoItem
// TodoList: widgets/ui/TodoList
// features - createTodo, deleteTodo, updateTodo

export default function App() {
  const { todos, error, loading } = useTodos();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (todos.length === 0) return <div>No todos found</div>;

  return (
    <>
      <header className="header">
        <div className="header__container">header</div>
      </header>
      <main className="main">
        <h1 className="main__container">main</h1>
        <ul>
          {todos.slice(0, 10).map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </main>
      <footer className="footer">
        <div className="footer__container">footer</div>
      </footer>
    </>
  );
}
