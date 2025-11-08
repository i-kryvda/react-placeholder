import "./App.css";
import { TodosPage } from "@components/pages/Todos/TodosPage";
import { AppProvider } from "./context/AppProvider";

export default function App() {
  return (
    <AppProvider>
      <TodosPage />
    </AppProvider>
  );
}
