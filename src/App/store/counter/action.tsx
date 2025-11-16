export const increment = () => ({ type: "INC" });
export const decrement = () => ({ type: "DEC" });
export const reset = () => ({ type: "RESET" });
export const setRandom = (payload: number) => ({
  type: "RND",
  payload: payload,
});
