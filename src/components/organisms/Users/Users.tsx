// import { useState } from "react";
// import { fetchApi } from "@shared/api/users";

// import { useEffect } from "react";

import { fetchUsers } from "@app/store/users/thunks";
import { useAppSelector } from "@shared/hooks/useAppSelector/useAppSelector";
import { useAppDispatch } from "@shared/hooks/useAppDispatch/useAppDispatch";

import css from "./Users.module.css";

export function Users() {
  const { users, loading, error } = useAppSelector((state) => state.users);
  console.log(error);

  const dispatch = useAppDispatch();

  const handleFetch = () => {
    dispatch(fetchUsers());
  };

  return (
    <>
      <button type="button" className={css.button} onClick={handleFetch}>
        FETCH
      </button>

      <div className={css.items}>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className={css.error}>Error: {error}</div>
        ) : users.length === 0 ? (
          <div>No users found</div>
        ) : (
          users.map((item) => (
            <div className={css.item} key={item.id}>
              {item.name}
            </div>
          ))
        )}
      </div>
    </>
  );
}
