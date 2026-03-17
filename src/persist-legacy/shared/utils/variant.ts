// Простий варіант.

import { todosReducer } from "@persist-legacy/app/store/todos/todos.slice";
import { counterReducer } from "@persist-legacy/app/store/counter/counter.slice";
import { themeReducer } from "@persist-legacy/app/store/theme/theme.slice.tsx";

//  Якщо брати RootState1 то цей варіат просто трохи більш рутиний
// export type RootState1 = {
//   todos: TodoState;
//   counter: CounterType;
// };

type RootState = {
  theme: ReturnType<typeof themeReducer>;
  todos: ReturnType<typeof todosReducer>;
  counter: ReturnType<typeof counterReducer>;
};

export const loadState = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem("todosState");
    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Cannot load state", e);
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = {
      todos: state.todos,
      counter: state.counter,
      theme: state.theme,
    };

    localStorage.setItem("todosState", JSON.stringify(serializedState));
  } catch (e) {
    console.error("Cannot save state", e);
  }
};
