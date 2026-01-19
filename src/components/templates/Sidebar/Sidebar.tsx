import { useEffect, useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";
import { TfiPencilAlt } from "react-icons/tfi";
import { IoSearch } from "react-icons/io5";
import { MdOutlineEventNote } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";

import s from "./Sidebar.module.scss";
import { useTheme } from "@app/context/ThemeProvider/ThemeProvider";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) return saved === "true";
    // return window.innerWidth < 768; // мобільне за замовчуванням закрите
    return true;
  });
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed.toString());
  }, [collapsed]);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <aside className={s.sidebar + (collapsed ? ` ${s.sidebarCollapsed}` : "")}>
      <button className={s.sidebarToggle} onClick={toggleSidebar}>
        <span className={s.sidebarToggleText}>Todo</span>
        <BsLayoutSidebar />
      </button>

      <nav className={s.sidebarNav}>
        <ul className={s.sidebarList}>
          <li className={s.sidebarItem}>
            <TfiPencilAlt className={s.sidebarIcon} />
            <span className={s.sidebarText}>Create task</span>
          </li>

          <li className={s.sidebarItem}>
            <IoSearch className={s.sidebarIcon} />
            <span className={s.sidebarText}>Search task</span>
          </li>

          <li className={s.sidebarItem}>
            <MdOutlineEventNote className={s.sidebarIcon} />
            <span className={s.sidebarText}>Active task</span>
          </li>

          <li className={s.sidebarItem}>
            <AiOutlineFileDone className={s.sidebarIcon} />
            <span className={s.sidebarText}>Complete task</span>
          </li>
        </ul>
      </nav>

      <div className={s.theme}>
        <button
          type="button"
          aria-label="Toggle theme"
          className={s.themeSwitch}
          onClick={toggleTheme}
        >
          <span className={s.themeCircle} />
        </button>
      </div>
    </aside>
  );
}
