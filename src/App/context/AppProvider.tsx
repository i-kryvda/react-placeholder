import { TodosProvider } from "./todos/TodosProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <TodosProvider>{children}</TodosProvider>;
}
