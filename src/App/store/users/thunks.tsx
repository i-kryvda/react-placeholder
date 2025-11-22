import {
  fetchUsersAction,
  fetchUsersSuccessAction,
  fetchUsersErrorAction,
} from "./actions";
import { type UsersAction } from "./types";
import { type Dispatch } from "redux";
import { api } from "@shared/api/users";

export function fetchUsers() {
  return async (dispatch: Dispatch<UsersAction>) => {
    try {
      dispatch(fetchUsersAction());

      const data = await api.getUsers();

      dispatch(fetchUsersSuccessAction(data));
    } catch (error) {
      dispatch(fetchUsersErrorAction("ERROR FETCH USERS"));
    }
  };
}
