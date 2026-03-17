import { useEffect, useState } from "react";

export function usePersistedState<T>(key: string, initialState: T) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    if (!item) return initialState;

    return JSON.parse(item) as T;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
