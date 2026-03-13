import { useCallback, useEffect, useState } from "react";

type Position = {
  left: number;
  top: number;
  width: number;
};

export function useDropdownPosition(
  containerRef: React.RefObject<HTMLElement | null>,
  isOpen: boolean,
) {
  const [position, setPosition] = useState<Position>({
    left: 0,
    top: 0,
    width: 0,
  });

  const updatePosition = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }, [containerRef]);

  useEffect(() => {
    if (isOpen) updatePosition();
  }, [isOpen, updatePosition]);

  // useResuzeObserver overkill
  useEffect(() => {
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [updatePosition]);

  return position;
}
