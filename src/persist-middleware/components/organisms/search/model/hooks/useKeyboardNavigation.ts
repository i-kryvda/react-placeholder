// [suggestions,setHighlightedIndex,scrollToActive, handleSelect, closeDropdown, onReset  ]

type useKeyboardNavigationProps = {
  suggestions: { title: string }[];
  suggestionsRef: React.RefObject<HTMLUListElement | null>;
  highlightedIndex: number;
  onEscape: () => void;
  onSelect: (value: string) => void;
  onHighlight: (index: number) => void;
  onHighlightReset?: () => void;
};

export function useKeyboardNavigation({
  suggestions,
  suggestionsRef,
  highlightedIndex,
  onEscape,
  onSelect,
  onHighlight,
}: useKeyboardNavigationProps) {
  const scrollToActive = (index: number) => {
    const container = suggestionsRef.current;
    const el = container?.children[index] as HTMLElement;
    if (!el || !container) return;

    el.scrollIntoView({ block: "nearest" });
  };

  return (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onEscape();
    }

    if (!suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const next =
          highlightedIndex < suggestions.length - 1 ? highlightedIndex + 1 : 0;
        onHighlight(next);
        scrollToActive(next);
        break;
      case "ArrowUp":
        e.preventDefault();
        const prev =
          highlightedIndex > 0 ? highlightedIndex - 1 : suggestions.length - 1;
        onHighlight(prev);
        scrollToActive(prev);
        break;

      case "Enter":
        if (highlightedIndex >= 0) {
          e.preventDefault();
          onSelect(suggestions[highlightedIndex].title);
        }
        break;
      case "Tab":
        if (highlightedIndex >= 0) {
          e.preventDefault();
        }
        break;
    }
  };
}
