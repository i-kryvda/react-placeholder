import { useTheme } from "@shared/hooks";
import { Button } from "@components/atoms/Button/ui";
import s from "./Header.module.scss";
import { setSearchQuery } from "@app/store/todos/todos.slice";
import {
  selectSearchQuery,
  selectSearchTodos,
} from "@app/store/todos/todos.selector";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { useEffect, useMemo, useState } from "react";

export function Header() {
  const { theme, toggle } = useTheme();

  const todos = useAppSelector(selectSearchTodos);
  const searchQuery = useAppSelector(selectSearchQuery);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState(searchQuery);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;

    setValue(nextValue);
    // if (nextValue) {
    //   setSuggestionsOpen(true);
    // } else {
    //   setSuggestionsOpen(false);
    // }
    setSuggestionsOpen(!!nextValue);
  };

  const suggestions = useMemo(() => {
    return todos
      .filter((todo) =>
        todo.title.toLowerCase().startsWith(value.toLowerCase()),
      )
      .sort((a, b) => a.title.localeCompare(b.title))
      .slice(0, 5);
  }, [todos, value]);

  const handleSelect = (title: string) => {
    setValue(title);
    dispatch(setSearchQuery(title));
    setSuggestionsOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    }

    if (e.key === "Enter") {
      if (activeIndex >= 0) {
        handleSelect(suggestions[activeIndex].title);
      }
    }

    if (e.key === "Escape") {
      setSuggestionsOpen(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== searchQuery) dispatch(setSearchQuery(value));
    }, 400);

    return () => clearTimeout(timer);
  }, [value, dispatch]);

  return (
    <header className={s.header}>
      <div className={`${s.headerContainer} header__container`}>
        <div className={s.headerLogo}>LOGO</div>

        <form className={s.search} onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="todo-search" className="visually-hidden">
            Search Todo
          </label>

          <div className={s.searchField}>
            <input
              value={value}
              onChange={onChange}
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

        <Button onClick={toggle}>SWITCH: {theme}</Button>
      </div>
    </header>
  );
}

{
  /* <SearchSuggestions /> */
}
