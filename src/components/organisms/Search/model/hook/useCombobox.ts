import { useAppDispatch, useAppSelector } from "@app/store/store";
import {
  selectSearchQuery,
  selectSearchTodos,
} from "@app/store/todos/todos.selector";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDropdownPosition } from "./useDropdownPosition";
import { useDebounce, useInput } from "@shared/hooks";
import { setSearchQuery } from "@app/store/todos/todos.slice";
import { useKeyboardNavigation } from "./useKeyboardNavigation";
import { useClickOutside } from "./useClickOutside";
import { getHighlightParts } from "../utils/highlightMatch";

interface ItemProps {
  item: { title: string };
  index: number;
}

export function useCombobox() {
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

  const onKeyDown = useKeyboardNavigation({
    suggestions,
    suggestionsRef,
    highlightedIndex,
    isKeyboardNavigation,
    onSelect: handleSelect,
    onEscape: () => {
      onReset();
      closeDropdown();
    },
    onHighlight: (i) => setHighlightedIndex(i),
  });

  useClickOutside(containerRef, closeDropdown);

  useEffect(() => {
    dispatch(setSearchQuery(debounced));
  }, [debounced, dispatch]);

  const suggestionsOpen =
    isOpen && value.trim().length > 0 && suggestions.length > 0;

  const activedescendant =
    highlightedIndex >= 0 ? getOptionId(highlightedIndex) : undefined;

  const getHighlightedParts = (text: string) =>
    getHighlightParts(text, searchQuery);

  const getInputProps = () => ({
    role: "combobox" as const,
    ref: inputRef,
    value,
    onChange: handleChange,
    onKeyDown,
    id: inputId,
    "aria-controls": listId,
    "aria-activedescendant": activedescendant,
    "aria-autocomplete": "list" as const,
    autoComplete: "off",
  });

  // <input
  //     type="text"
  //     placeholder="Search Todo..."
  //   />

  const getMenuProps = () => ({
    role: "listbox" as const,
    ref: suggestionsRef,
    id: listId,
    onMouseMove: () => {
      isKeyboardNavigation.current = false;
    },
    style: {
      position: "absolute" as const,
      top: position.top,
      left: position.left,
      width: position.width,
      zIndex: 9999,
    },
  });

  // <ul
  //     className={s.suggestions}
  //   >

  const getItemProps = ({ item, index }: ItemProps) => ({
    role: "option" as const,
    id: getOptionId(index),
    "aria-selected": index === highlightedIndex,
    onMouseEnter: () => {
      if (!isKeyboardNavigation.current) setHighlightedIndex(index);
    },
    onMouseDown: () => handleSelect(item.title),
  });

  return {
    getInputProps,
    getMenuProps,
    getItemProps,
    getHighlightedParts,
    suggestionsOpen,
    highlightedIndex,
    suggestions,
    containerRef,
  };
}
