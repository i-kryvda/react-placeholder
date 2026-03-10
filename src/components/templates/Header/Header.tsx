import { useTheme } from "@shared/hooks";
import { Button } from "@components/atoms/Button/ui";
import { Search } from "@components/organisms/Search";
import s from "./Header.module.scss";

export function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className={s.header}>
      <div className={`${s.headerContainer} header__container`}>
        <div className={s.headerLogo}>LOGO</div>

        <Search />

        <Button onClick={toggle}>SWITCH: {theme}</Button>
      </div>
    </header>
  );
}

{
  /* <SearchSuggestions /> */
}
