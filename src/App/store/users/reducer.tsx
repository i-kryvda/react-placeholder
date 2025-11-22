import { type UsersState, type UsersAction } from "./types";
import { ACTION } from "./actions";

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export function usersReducer(
  state = initialState,
  action: UsersAction
): UsersState {
  switch (action.type) {
    case ACTION.FETCH_USERS:
      return { ...state, loading: true };
    case ACTION.FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case ACTION.FETCH_USERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
