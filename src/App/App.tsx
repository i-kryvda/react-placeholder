import { useState } from "react";

import {
  MdDashboard,
  MdPerson,
  MdSettings,
  MdLogout,
  MdMenu,
} from "react-icons/md";

import { TbAtom2Filled } from "react-icons/tb";
import { TfiPencilAlt } from "react-icons/tfi";
// import { FaPenToSquare } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdOutlineEventNote } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";

import "./App.scss";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <>
      <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}>
        <button className="sidebar__toggle" onClick={toggleSidebar}>
          <TbAtom2Filled />
        </button>

        <nav className="sidebar__nav">
          <ul className="sidebar__list">
            <li className="sidebar__item">
              <TfiPencilAlt className="sidebar__icon" />
              <span className="sidebar__text">Create task</span>
            </li>

            <li className="sidebar__item">
              <IoSearch className="sidebar__icon" />
              <span className="sidebar__text">Search task</span>
            </li>

            <li className="sidebar__item">
              <MdOutlineEventNote className="sidebar__icon" />
              <span className="sidebar__text">Active task</span>
            </li>

            <li className="sidebar__item sidebar__item--logout">
              <AiOutlineFileDone className="sidebar__icon" />
              <span className="sidebar__text">Complete task</span>
            </li>
          </ul>
        </nav>
      </aside>

      <div className={`app `}>
        <header className="header">
          <div className="header__container">Todo List With Redux</div>
        </header>
        <main className="main">
          <h1 className="main__container">main</h1>
        </main>
        <footer className="footer">
          <div className="footer__container">footer</div>
        </footer>
      </div>
    </>
  );
}
