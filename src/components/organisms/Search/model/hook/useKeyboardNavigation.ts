// [suggestions,setHighlightedIndex,scrollToActive, handleSelect, closeDropdown, onReset  ]

type Props = {
  suggestions: { title: string }[];
  suggestionsRef: React.RefObject<HTMLUListElement | null>;
  highlightedIndex: number;
  isKeyboardNavigation: React.RefObject<boolean>;
  onSelect: (title: string) => void; // handleSelect
  onEscape: () => void; // onReset + closeDropdown
  onHighlight: (index: number) => void; // setHighlightedIndex(index)
  onHighlightReset?: () => void;
};

export function useKeyboardNavigation({
  suggestions,
  suggestionsRef,
  highlightedIndex,
  isKeyboardNavigation,
  onEscape,
  onSelect,
  onHighlight,
}: Props) {
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
        isKeyboardNavigation.current = true;
        const next =
          highlightedIndex < suggestions.length - 1 ? highlightedIndex + 1 : 0;
        onHighlight(next);
        scrollToActive(next);
        break;
      case "ArrowUp":
        e.preventDefault();
        isKeyboardNavigation.current = true;
        const prev =
          highlightedIndex > 0 ? highlightedIndex - 1 : suggestions.length - 1;
        onHighlight(prev);
        scrollToActive(prev);
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          e.preventDefault();
          onSelect(suggestions[highlightedIndex].title);
          // inputRef.current?.blur();
        }
        break;
      case "Tab":
        if (highlightedIndex >= 0) {
          e.preventDefault();
          onSelect(suggestions[highlightedIndex].title);
        }
        break;
    }
  };
}
