import { Search } from "@persist-redux/components/organisms/search/ui/search";
import style from "./Header.module.scss";

export function Header() {
  return (
    <header className={style.header}>
      <div className="header__container">
        <div className={style.box}>
          <div>UA</div>
          <Search />
        </div>
      </div>
    </header>
  );
}
