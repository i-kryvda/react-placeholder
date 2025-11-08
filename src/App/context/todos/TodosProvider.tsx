import { createContext, useContext } from "react";
import { useLocalStorage } from "@shared/hooks/useLocalStorage/useLocalStorage";

type TodosItemType = {
  id: number;
  text: string;
};

type TodosContextType = {
  todos: TodosItemType[];
  setTodos: React.Dispatch<React.SetStateAction<TodosItemType[]>>;
  createTodo: (text: string) => void;
  deleteTodo: (todoId: number) => void;
};

const TodosContext = createContext<TodosContextType | null>(null);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useLocalStorage<TodosItemType[]>("todos", []);

  const createTodo = (text: string) => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter((item) => item.id !== todoId));
  };

  return (
    <TodosContext.Provider value={{ todos, setTodos, createTodo, deleteTodo }}>
      {children}
    </TodosContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("Ops have problem in TodosContext");
  }

  return context;
}
