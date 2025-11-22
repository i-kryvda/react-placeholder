import type { UserType } from "./types";

export const ACTION = {
  FETCH_USERS: "FETCH_USERS",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  FETCH_USERS_ERROR: "FETCH_USERS_ERROR",
} as const;

export const fetchUsersAction = () => ({ type: ACTION.FETCH_USERS });

export const fetchUsersSuccessAction = (payload: UserType[]) => ({
  type: ACTION.FETCH_USERS_SUCCESS,
  payload,
});

export const fetchUsersErrorAction = (payload: string) => ({
  type: ACTION.FETCH_USERS_ERROR,
  payload,
});
