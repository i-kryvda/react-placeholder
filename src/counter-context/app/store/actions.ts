// Action creator має бути чистою функцією

import { ACTIONS } from "./context";

export const randomCounter = (value: number) => ({
  type: ACTIONS.RND,
  payload: value,
});
