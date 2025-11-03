import type { CounterType, ActionType } from "./types";

export const initialState: CounterType = {
  count: 0,
};

export function counterReducer(
  state: CounterType,
  action: ActionType
): CounterType {
  switch (action.type) {
    case "INC":
      return { count: state.count + 1 };
    case "DEC":
      return { count: state.count - 1 };
    case "RND":
      return { count: action.payload };
    default:
      return state;
  }
}
