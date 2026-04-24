import { useEffect, useState } from "react";
import "./App.scss";

// entities/todos/model/types
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const BASE_URL = " http://localhost:3001";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// shared/api
const api = async (url: string, options: RequestInit = {}) => {
  return fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    return res.json();
  });
};
/// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// entities/todos/api
const getTodos = async () => {
  const res: Todo[] = await api("/todos");
  return res;
};

const createTodo = async (title: string) => {
  const newTodo: Omit<Todo, "id"> = {
    userId: 1,
    title,
    completed: false,
  };
  await delay(1000); // Simulate network delay
  const res: Todo = await api("/todos", {
    method: "POST",
    body: JSON.stringify(newTodo),
  });
  return res;
};

const deleteTodo = async (id: number) => {
  await delay(500); // Simulate network delay

  await api(`/todos/${id}`, {
    method: "DELETE",
  });
};

const updateTodo = async (id: number, updates: Partial<Todo>) => {
  await delay(200); // Simulate network delay

  const res: Todo = await api(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
  return res;
};

const patchTodo = async (id: number, updates: Partial<Todo>) => {
  await delay(200); // Simulate network delay

  const res: Todo = await api(`/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
  return res;
};

/// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// entities/todos/model
const useTodos = (setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: Todo[] = await getTodos();
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

  return { error, loading };
};

// features/createTodo/model
const useCreateTodo = (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const create = async (title: string) => {
    setLoading(true);
    setError(null);
    try {
      const newTodo = await createTodo(title);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { create, error, loading };
};

// features/deleteTodo/model
const useDeleteTodo = (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id: number) => {
    setDeletingId(id);
    setError(null);
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setDeletingId(null);
    }
  };

  return { remove, error, deletingId };
};

// features/toggleTodo/model
const useToggleTodo = (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  // const prev = todos;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggle = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await patchTodo(id, { completed: true });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updated : todo)),
      );
    } catch (error) {
      setError((error as Error).message);
      // setTodos(prev); // rollback
    } finally {
      setLoading(false);
    }
  };

  return { toggle, error, loading };
};

// features/updateTodo/model
const useUpdateTodo = (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const update = async (id: number, updates: Partial<Todo>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTodo = await updateTodo(id, updates);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      );
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { update, error, loading };
};

/// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// TodoItem: entities/todos/ui/TodoItem
// TodoList: widgets/ui/TodoList
// features - createTodo, deleteTodo, updateTodo

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState("");

  const {
    create,
    error: createError,
    loading: createLoading,
  } = useCreateTodo(setTodos);

  const { error, loading } = useTodos(setTodos);

  const { remove, deletingId } = useDeleteTodo(setTodos);

  const { toggle } = useToggleTodo(setTodos);
  const { update } = useUpdateTodo(setTodos);

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

        <input
          type="text"
          placeholder="Enter todo title"
          className="todo-create-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="button"
          className="todo-create-button"
          onClick={() => create(value)}
          disabled={createLoading}
        >
          {createLoading ? "Creating..." : "Create Todo"}
        </button>
        {createError && <div className="error">Error: {createError}</div>}

        <ul>
          {todos.slice(0, 10).map((todo) => (
            <li key={todo.id} className="todo-item">
              <p>
                {todo.title} {todo.completed ? "✓" : "✗"}
              </p>
              <div className="todo-buttons">
                <button type="button" onClick={() => toggle(todo.id)}>
                  Toggle
                </button>
                <button type="button" onClick={() => remove(todo.id)}>
                  {deletingId === todo.id ? "Deleting..." : "Delete"}
                </button>
                <button
                  type="button"
                  onClick={() => update(todo.id, { title: "Updated Title" })}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <footer className="footer">
        <div className="footer__container">footer</div>
      </footer>
    </>
  );
}
