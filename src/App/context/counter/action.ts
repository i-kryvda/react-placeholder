export const ACTIONS = {
  INC: "INC",
  DEC: "DEC",
  RND: "RND",
} as const;

export const onIncrement = () => ({ type: ACTIONS.INC });
export const onDecrement = () => ({ type: ACTIONS.DEC });
export const onRandom = (value: number) => ({
  type: ACTIONS.RND,
  payload: value,
});
