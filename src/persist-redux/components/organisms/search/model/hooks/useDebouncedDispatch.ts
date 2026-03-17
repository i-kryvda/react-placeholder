import { useAppDispatch } from "@persist-redux/app/store/store";
import { setSearchQuery } from "@persist-redux/app/store/todos/todos-slice";
import { useDebounce } from "@persist-redux/shared/hooks/useDebounce";
import { useEffect } from "react";

export function useDebounceDispatch(value: string, delay: number) {
  const dispatch = useAppDispatch();
  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedValue));
  }, [debouncedValue, dispatch]);
}
