import "./App.scss";
import axios from "axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { useProgressBar } from "@app/providers/progress-bar/model/useProgressBar";

// shared/api/api.ts 📜
const api = axios.create({
  baseURL: "http://localhost:3001",
});

// shared/lib/delay.ts 📜
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// entities/todo/model/types.ts 📜

type PaginatedResponse = {
  data: Todo[];
  total: number;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

type ToggleTodoDto = Pick<Todo, "id" | "completed">;
type UpdateTodoDto = Pick<Todo, "id" | "title">;

type GetTodosParams = {
  page?: number;
  limit?: number;
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// entities/todo/api 📜
const getTodos = async (params: GetTodosParams): Promise<PaginatedResponse> => {
  await delay(500);

  const { data, headers } = await api.get<Todo[]>("/todos", {
    params: {
      _sort: "createdAt",
      _order: "desc",
      _page: params.page || 1,
      _limit: params.limit || 10,
    },
  });

  return { data, total: Number(headers["x-total-count"] ?? 0) };
};

const deleteTodo = async (id: number) => {
  await api.delete(`/todos/${id}`);
};

const createTodo = async (title: string) => {
  await api.post("/todos", {
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  });
};

const toggleTodo = async ({ id, completed }: ToggleTodoDto) => {
  await api.patch(`/todos/${id}`, {
    completed,
  });
};

const editTodo = async ({ id, title }: UpdateTodoDto) => {
  await api.patch(`/todos/${id}`, {
    title,
  });
};

// entities/todo/model/hooks 📜
const useTodos = (params: GetTodosParams) => {
  return useQuery({
    queryKey: ["todos", params],
    queryFn: () => getTodos(params),
    placeholderData: keepPreviousData,

    // select: (data) => [...data].sort((a, b) => b.id - a.id),
  });
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// features/delete-todo/model/hooks 📜
const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// features/create-todo/model/hooks 📜
const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createTodo"], // Optional, but can be useful for debugging and devtools
    mutationFn: (title: string) => createTodo(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// features/toggle-todo/model/hooks 📜
const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["toggleTodo"], // Optional
    mutationFn: ({ id, completed }: ToggleTodoDto) =>
      toggleTodo({ id, completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// features/edit-todo/model/hooks 📜
const useEditTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editTodo"], // Optional
    mutationFn: ({ id, title }: UpdateTodoDto) => editTodo({ id, title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const LIMIT = 3;

export default function App() {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useTodos({ page, limit: LIMIT });

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 0;

  const { mutate: deleteTodoMutate } = useDeleteTodo();
  const { mutate: createTodoMutate } = useCreateTodo();
  const { mutate: toggleTodoMutate } = useToggleTodo();
  const { mutate: editTodoMutate } = useEditTodo();
  const { visible, progress } = useProgressBar();

  return (
    <>
      <header className="header">
        <div className="header__container">header</div>
      </header>
      <main className="main">
        <h1 className="main__container">main</h1>

        <div
          className={`progress-bar ${!visible ? "hidden" : ""}`}
          style={{ width: `${progress}%` }}
        />

        <div className="add-todo">
          <input
            type="text"
            className="todo-create-input"
            placeholder="What needs to be done?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="button" onClick={() => createTodoMutate(value)}>
            Add
          </button>
        </div>

        <button
          type="button"
          className="todo-button"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          Prev Page
        </button>
        <button
          type="button"
          className="todo-button"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          Next Page
        </button>

        {isLoading && <p>Loading...</p>}

        <ul style={{ padding: "10rem 0rem" }}>
          {data?.data.map((todo: any) => (
            <li key={todo.id} className="todo-item">
              <p>
                {todo.title} {todo.completed ? "✓" : "✗"}
              </p>
              <div className="todo-buttons">
                <button
                  type="button"
                  onClick={() =>
                    toggleTodoMutate({
                      id: todo.id,
                      completed: !todo.completed,
                    })
                  }
                >
                  Toggle
                </button>
                <button type="button" onClick={() => deleteTodoMutate(todo.id)}>
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editTodoMutate({ id: todo.id, title: "new title" })
                  }
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
