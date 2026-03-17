import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

// getFocusableElements допомогає мати актуальні фокусовані елементи, навіть якщо вони змінюються
const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
  ).filter((el) => el.offsetParent !== null); // Фільтруємо елементи, які не видимі (наприклад, display: none)
};

export function useFocusTrap(
  ref: React.RefObject<HTMLElement | null>,
  isActive: boolean,
) {
  const prevFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;
    // Зберігаємо посилання на елемент, який був у фокусі до активації Focus Trap
    prevFocusedElement.current = document.activeElement as HTMLElement;
    const container = ref.current;
    // container.focus();

    const focusableElements = getFocusableElements(container);
    if (focusableElements.length === 0) return;

    focusableElements[0]?.focus();

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      // Ось тут є ризик втратити актуальні фокусовані елементи
      const focusables = getFocusableElements(container);
      if (focusables.length === 0) return;

      const firstElement = focusables[0];
      const lastElement = focusables[focusables.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener("keydown", handleTab);

    return () => {
      // Не забудь повернути фокус після деактивації Focus Trap
      prevFocusedElement.current?.focus();
      container.removeEventListener("keydown", handleTab);
    };
  }, [isActive]);
}
