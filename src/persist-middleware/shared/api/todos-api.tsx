import axios from "axios";
import type { TodoType } from "@persist-middleware/app/store/todos/todos-types.tsx";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchTodos(): Promise<TodoType[]> {
  const response = await axios.get<TodoType[]>(BASE_URL + "/todos");
  return response.data;
}

export async function fetchTodoById(id: number): Promise<TodoType> {
  const response = await axios.get<TodoType>(BASE_URL + "/todos/" + id);
  return response.data;
}
