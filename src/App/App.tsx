import { useState } from "react";

import { RiMastodonLine } from "react-icons/ri";

import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdOutlineTaskAlt } from "react-icons/md";

import { FaSearch } from "react-icons/fa";
import "./App.scss";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <aside className={`sidebar ${isSidebarOpen ? "sidebar--open" : ""}`}>
        <nav className="sidebar__nav">
          <button
            className="sidebar__toggle"
            aria-label="Toggle sidebar"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <RiMastodonLine size={24} />
          </button>
          {/* <a href="#" className="sidebar__logo"></a> */}

          <ul className="sidebar__menu">
            <li className="sidebar__menu-item">
              <button>
                <IoAddCircleOutline className="icon" />
                <span className="sidebar__menu-text">Create</span>
              </button>
            </li>
            <li className="sidebar__menu-item">
              <button>
                <FaSearch className="icon" />
                <span className="sidebar__menu-text">Search</span>
              </button>
            </li>
            <li className="sidebar__menu-item">
              <button>
                <MdOutlinePendingActions className="icon" />
                <span className="sidebar__menu-text">Active</span>
              </button>
            </li>
            <li className="sidebar__menu-item">
              <button>
                <MdOutlineTaskAlt className="icon" />
                <span className="sidebar__menu-text">Complete</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className={`app ${isSidebarOpen ? "app--sidebar-open" : ""}`}>
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
