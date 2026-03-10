import { useRef } from "react";

export function useFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const focus = () => ref.current?.focus();

  return { ref, focus };
}
