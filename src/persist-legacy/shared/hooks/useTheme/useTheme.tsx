import { useEffect } from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "@persist-legacy/app/store/store.tsx";
import { toggleTheme } from "@persist-legacy/app/store/theme/theme.slice.tsx";

export function useTheme() {
  const theme = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggle = () => {
    dispatch(toggleTheme());
  };

  return { theme, toggle };
}
