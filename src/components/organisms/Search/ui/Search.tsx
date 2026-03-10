import { useAppDispatch, useAppSelector } from "@app/store/store";
import {
  selectSearchQuery,
  selectSearchTodos,
} from "@app/store/todos/todos.selector";
import { setSearchQuery } from "@app/store/todos/todos.slice";
import { useInput, useDebounce } from "@shared/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import s from "./Search.module.scss";

export function Search() {
  const todos = useAppSelector(selectSearchTodos);
  const searchQuery = useAppSelector(selectSearchQuery);
  const dispatch = useAppDispatch();
  const { value, onChange, setValue } = useInput(searchQuery);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounced = useDebounce(value, 500);
  const isSelectingRef = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  // правильно це виносити в selector ✔
  const suggestions = useMemo(() => {
    return todos
      .filter((todo) => todo.title.toLowerCase().includes(value.toLowerCase()))
      .sort((a, b) => a.title.localeCompare(b.title))
      .slice(0, 5);
  }, [todos, value]);

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

    setSuggestionsOpen(!!value);
  }, [value]);

  useEffect(() => {
    dispatch(setSearchQuery(debounced));
  }, [debounced, dispatch]);

  return (
    <form className={s.search} onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="todo-search" className="visually-hidden">
        Search Todo
      </label>

      <div className={s.searchField}>
        <input
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          type="search"
          id="todo-search"
          placeholder="Search Todo..."
        />

        {suggestionsOpen && suggestions.length > 0 && (
          <ul className={s.suggestions}>
            {suggestions.map((item, index) => (
              <li
                key={item.id}
                className={index === activeIndex ? s.active : ""}
                onClick={() => handleSelect(item.title)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
