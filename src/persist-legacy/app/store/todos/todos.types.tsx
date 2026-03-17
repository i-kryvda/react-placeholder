export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
};

export type ViewMode = "list" | "card";

export type TodoState = {
  todos: TodoItem[];
  view: ViewMode;
};
