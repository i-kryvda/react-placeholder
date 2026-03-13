import { useAppDispatch, useAppSelector } from "@app/store/store";
import { createPortal } from "react-dom";
// import { clsx } from "clsx";
import {
  selectSearchQuery,
  selectSearchTodos,
} from "@app/store/todos/todos.selector";
import { setSearchQuery } from "@app/store/todos/todos.slice";
import { useInput, useDebounce } from "@shared/hooks";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { getHighlightParts } from "../model/utils/highlightMatch";
import s from "./Search.module.scss";
import { useDropdownPosition } from "../model/hook/useDropdownPosition";
import { useClickOutside } from "../model/hook/useClickOutside";

export function Search() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectSearchTodos);
  const searchQuery = useAppSelector(selectSearchQuery);
  // highlightedIndex
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLFormElement | null>(null);
  const suggestionsRef = useRef<HTMLUListElement | null>(null);
  const isKeyboardNavigation = useRef(false);
  const position = useDropdownPosition(containerRef, isOpen);

  const { value, onChange, setValue, onReset } = useInput(searchQuery);
  const debounced = useDebounce(value, 300);

  const id = useId();
  const inputId = `${id}-input`;
  const listId = `${id}-list`;
  const getOptionId = (i: number) => `${id}-option-${i}`;

  // createSelector ✔
  const suggestions = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().startsWith(value.toLowerCase()),
    );
    // .sort((a, b) => a.title.localeCompare(b.title))
    // .slice(0, 3)
  }, [todos, value]);

  const scrollToActive = (index: number) => {
    const container = suggestionsRef.current;
    const el = container?.children[index] as HTMLElement;
    if (!el || !container) return;

    el.scrollIntoView({ block: "nearest" });
  };

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange(e);
    setIsOpen(Boolean(v));
    setHighlightedIndex(-1);
  };

  const handleSelect = (title: string) => {
    setValue(title);
    dispatch(setSearchQuery(title));
    closeDropdown();
  };

  // [suggestions,setHighlightedIndex,scrollToActive, handleSelect, closeDropdown, onReset  ]
  //

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onReset();
      closeDropdown();
    }

    if (!suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        isKeyboardNavigation.current = true;
        const next =
          highlightedIndex < suggestions.length - 1 ? highlightedIndex + 1 : 0;
        setHighlightedIndex(next);
        scrollToActive(next);
        break;
      case "ArrowUp":
        e.preventDefault();
        isKeyboardNavigation.current = true;
        const prev =
          highlightedIndex > 0 ? highlightedIndex - 1 : suggestions.length - 1;
        setHighlightedIndex(prev);
        scrollToActive(prev);
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          e.preventDefault();
          handleSelect(suggestions[highlightedIndex].title);
          // inputRef.current?.blur();
        }
        break;
      case "Tab":
        if (highlightedIndex >= 0) {
          e.preventDefault();
          handleSelect(suggestions[highlightedIndex].title);
        }
        break;
    }
  };

  useClickOutside(containerRef, closeDropdown);

  // useDebouncedDispatch
  useEffect(() => {
    dispatch(setSearchQuery(debounced));
  }, [debounced, dispatch]);

  const suggestionsOpen =
    isOpen && value.trim().length > 0 && suggestions.length > 0;

  const activedescendant =
    highlightedIndex >= 0 ? getOptionId(highlightedIndex) : undefined;

  return (
    <form
      className={s.search}
      onSubmit={(e) => e.preventDefault()}
      ref={containerRef}
    >
      <label htmlFor={inputId} className="visually-hidden">
        Search Todo
      </label>

      <div className={s.searchField}>
        <input
          role="combobox"
          type="text"
          placeholder="Search Todo..."
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          id={inputId}
          aria-controls={listId}
          aria-activedescendant={activedescendant}
          aria-autocomplete="list"
          autoComplete="off"
        />
      </div>

      {suggestionsOpen &&
        createPortal(
          <ul
            ref={suggestionsRef}
            onMouseMove={() => {
              isKeyboardNavigation.current = false;
            }}
            className={s.suggestions}
            id={listId}
            role="listbox"
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              width: position.width,
              zIndex: 9999,
            }}
          >
            {suggestions.map((item, index) => (
              <li
                id={getOptionId(index)}
                role="option"
                key={item.id}
                className={
                  index === highlightedIndex
                    ? `${s.suggestion} ${s.active}`
                    : `${s.suggestion}`
                }
                aria-selected={index === highlightedIndex}
                onMouseEnter={() => {
                  if (!isKeyboardNavigation.current) {
                    setHighlightedIndex(index);
                  }
                }}
                onMouseDown={() => handleSelect(item.title)}
              >
                {/* {item.title} */}
                {getHighlightParts(item.title, searchQuery).map((part, i) =>
                  part.isMatch ? (
                    <mark key={i} className={s.highlight}>
                      {part.text}
                    </mark>
                  ) : (
                    <span key={i}>{part.text}</span>
                  ),
                )}
              </li>
            ))}
          </ul>,

          document.body,
        )}
    </form>
  );
}
