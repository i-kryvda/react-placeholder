import { useTheme } from "@persist-legacy/shared/hooks";
import s from "./Header.module.scss";

export function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className={s.header}>
      <div className={`${s.headerContainer} + header__container`}>
        <div className="logo">LOGO</div>
        <button type="button" className="button" onClick={toggle}>
          SWITCH: {theme}
        </button>
      </div>
    </header>
  );
}
