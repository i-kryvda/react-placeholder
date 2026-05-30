// @@@@@@@@@ TYPES @@@@@@@@@@

export type State = {
  counter: number;
};

export type Action =
  | { type: "INC" }
  | { type: "DEC" }
  | { type: "RND"; payload: number }
  | { type: "RESET" };

// @@@@@@@@@ ACTIONS @@@@@@@@@@

export const increment = () => ({ type: "INC" });
export const decrement = () => ({ type: "DEC" });
export const reset = () => ({ type: "RESET" });
export const setRandom = (payload: number) => ({
  type: "RND",
  payload: payload,
});

// @@@@@@@@@ REDUCER @@@@@@@@@@

const initialState: State = {
  counter: 0,
};

export function reducerCounter(state = initialState, action: Action) {
  switch (action.type) {
    case "INC":
      return { ...state, counter: state.counter + 1 };
    case "DEC":
      return { ...state, counter: state.counter - 1 };
    case "RND":
      return { ...state, counter: action.payload };
    case "RESET":
      return { ...state, counter: 0 };
    default:
      return state;
  }
}
