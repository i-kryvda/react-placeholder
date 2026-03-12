import { useAppDispatch, useAppSelector } from "@app/store/store";
import { createPortal } from "react-dom";
import { clsx } from "clsx";
import {
  selectSearchQuery,
  selectSearchTodos,
} from "@app/store/todos/todos.selector";
import { setSearchQuery } from "@app/store/todos/todos.slice";
import { useInput, useDebounce } from "@shared/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { getHighlightParts } from "../model/utils/highlightMatch";
import s from "./Search.module.scss";

/*
 * получаєм query з store
 * onChange,
 *
 */
// selectSearchTodos
export function Search() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectSearchTodos);
  const searchQuery = useAppSelector(selectSearchQuery);
  // const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  // const isSelectingRef = useRef(false); // ???
  const [isFocused, setIsFocused] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<null | HTMLInputElement>(null);
  const containerRef = useRef<null | HTMLFormElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const { value, onChange, setValue } = useInput(searchQuery);
  const debounced = useDebounce(value, 300);

  // правильно це виносити в selector ✔
  const suggestions = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().startsWith(value.toLowerCase()),
    );
    // .sort((a, b) => a.title.localeCompare(b.title))
    // .slice(0, 3)
  }, [todos, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange(e);

    if (v.trim()) {
      setIsFocused(true);
      const rect = containerRef.current!.getBoundingClientRect();

      setPosition({
        top: rect.bottom + window.scrollY, // щоб врахувати прокрутку
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    } else {
      setIsFocused(false);
    }

    setActiveIndex(-1);
  };

  const handleSelect = (title: string) => {
    // isSelectingRef.current = true;
    setValue(title);
    dispatch(setSearchQuery(title));

    setIsFocused(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
    // setIsFocused(false);
    // setSuggestionsOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1,
        );
        break;
      case "Enter":
        if (activeIndex >= 0) {
          e.preventDefault();
          handleSelect(suggestions[activeIndex].title);
          inputRef.current?.blur();
        }
        break;
      case "Escape":
        // setSuggestionsOpen(false);
        setActiveIndex(-1);
        break;

      case "Tab":
        if (activeIndex >= 0) {
          e.preventDefault();
          handleSelect(suggestions[activeIndex].title);
        }
        // setSuggestionsOpen(false);
        break;
    }
  };

  // useEffect(() => {
  //   if (isSelectingRef.current) {
  //     isSelectingRef.current = false;
  //     return;
  //   }

  //   setSuggestionsOpen(!!value && !inputRef.current?.focus());
  // }, [value]);

  useEffect(() => {
    dispatch(setSearchQuery(debounced));
  }, [debounced, dispatch]);

  // const isOpen = suggestionsOpen && suggestions.length > 0;
  const isOpen = isFocused && value && suggestions.length > 0;

  return (
    <form
      className={s.search}
      onSubmit={(e) => e.preventDefault()}
      ref={containerRef}
    >
      <label htmlFor="search" className="visually-hidden">
        Search Todo
      </label>

      <div className={s.searchField}>
        <input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          // onFocus={() => setIsFocused(true)}
          // onBlur={() => setIsFocused(false)}
          type="search"
          id="search"
          placeholder="Search Todo..."
          role="combobox"
          aria-autocomplete="list"
          aria-controls="suggestions-list"
          autoComplete="off"
        />
      </div>

      {isOpen &&
        createPortal(
          <ul
            className={s.suggestions}
            id="suggestions-list"
            role="listbox"
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              width: position.width,
              // width: "100",
              border: "1px solid #ccc",
              zIndex: 9999,
            }}
          >
            {suggestions.map((item, index) => (
              <li
                id="option-0"
                role="option"
                key={item.id}
                className={
                  index === activeIndex
                    ? `${s.suggestion} ${s.active}`
                    : `${s.suggestion}`
                }
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
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
