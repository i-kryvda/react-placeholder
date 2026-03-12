import { useAppDispatch, useAppSelector } from "@app/store/store";
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
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const isSelectingRef = useRef(false);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const { value, onChange, setValue } = useInput(searchQuery);
  const debounced = useDebounce(value, 300);

  // правильно це виносити в selector ✔
  const suggestions = useMemo(() => {
    return (
      todos
        .filter((todo) =>
          todo.title.toLowerCase().includes(value.toLowerCase()),
        )
        // .sort((a, b) => a.title.localeCompare(b.title))
        .slice(0, 5)
    );
  }, [todos, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    // setSuggestionsOpen(true);
    // setActiveIndex(-1);
  };

  const handleSelect = (title: string) => {
    isSelectingRef.current = true;
    setValue(title);
    dispatch(setSearchQuery(title));
    setSuggestionsOpen(false);
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
        }
        break;
      case "Escape":
        setSuggestionsOpen(false);
        setActiveIndex(-1);
        break;

      case "Tab":
        if (activeIndex >= 0) {
          e.preventDefault();
          handleSelect(suggestions[activeIndex].title);
        }
        setSuggestionsOpen(false);
        break;
    }
  };

  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    setSuggestionsOpen(!!value && !inputRef.current?.focus());
  }, [value]);

  useEffect(() => {
    dispatch(setSearchQuery(debounced));
  }, [debounced, dispatch]);

  return (
    <form className={s.search} onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search" className="visually-hidden">
        Search Todo
      </label>

      <div className={s.searchField}>
        <input
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          type="search"
          ref={inputRef}
          id="search"
          placeholder="Search Todo..."
          role="combobox"
          onBlur={() => setSuggestionsOpen(false)}
          aria-autocomplete="list"
          aria-controls="suggestions-list"
          autoComplete="off"
        />
      </div>

      {suggestionsOpen && suggestions.length > 0 && (
        <ul className={s.suggestions} id="suggestions-list" role="listbox">
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
        </ul>
      )}
    </form>
  );
}
