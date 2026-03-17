import { useEffect } from "react";

export function useClickOutside(
  containerRef: React.RefObject<HTMLElement | null>,
  handler: () => void,
) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el || el.contains(e.target as Node)) return;

      handler();
    };

    document.addEventListener("mousedown", listener);

    return () => document.removeEventListener("mousedown", listener);
  }, [containerRef, handler]);
}
