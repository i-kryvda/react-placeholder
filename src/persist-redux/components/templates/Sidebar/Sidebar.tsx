import { useEffect, useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
// import { IoSearch } from "react-icons/io5";
import { MdOutlineEventNote } from "react-icons/md";

// import { MdDoneOutline } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

import { useTheme } from "@persist-redux/app/context/ThemeProvider/ThemeProvider";
import { useAppDispatch, useAppSelector } from "@persist-redux/app/store/store";
import { setFilter } from "@persist-redux/app/store/todos/todos-slice";
import { selectFilter } from "@persist-redux/app/store/todos/todos-selectors";

import s from "./Sidebar.module.scss";
import { useModalStack } from "@persist-redux/app/context/ModalProvider/ModalProvider";
// import { CreateModal } from "@persist-redux/components/molecules/CreateModal/CreateModal";
import { CreateTodo } from "@persist-redux/components/organisms/CreateTodo/CreateTodo";
// import { IoSearch } from "react-icons/io5";
// import { TbTransitionRightFilled } from "react-icons/tb";
import { GiAtomicSlashes } from "react-icons/gi";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Tooltip } from "@persist-redux/components/atoms/Tooltip/Tooltip";

type SidebarProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

export function Sidebar({ collapsed, toggleSidebar }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  // const toggleSidebar = () => setCollapsed((prev) => !prev);
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();
  const { openModal, closeModal } = useModalStack();

  const handleCreate = () => {
    openModal((modalId) => {
      const close = () => closeModal(modalId);
      return <CreateTodo onSubmitSuccess={close} onClose={close} />;
    });
  };

  return (
    <>
      {!collapsed && <div className={s.overlay} onClick={toggleSidebar} />}

      <aside
        className={s.sidebar + (collapsed ? ` ${s.sidebarCollapsed}` : "")}
      >
        <nav className={s.sidebarNav}>
          <ul className={s.sidebarList}>
            {/* <li className={s.sidebarItem}>
            <IoSearch className={s.sidebarIcon} />
            <span className={s.sidebarText}>Search </span>
          </li> */}

            <li className={s.sidebarToggleItem} onClick={toggleSidebar}>
              <span className={`${s.iconLeft} ${s.iconWrapper}`}>
                <GiAtomicSlashes
                  size={24}
                  className={`${s.icon} ${s.atomic}`}
                />
                <IoIosArrowBack size={24} className={`${s.icon} ${s.layout}`} />
              </span>

              <span className={`${s.iconRigth} ${s.iconWrapper}`}>
                <BsLayoutSidebar size={24} />
              </span>
            </li>

            <li
              className={`${s.sidebarItem} ${filter === "active" ? s.sidebarItemActive : ""}`}
              onClick={() => dispatch(setFilter("active"))}
            >
              <Tooltip
                content="Show active todos"
                placement="right"
                disabled={!collapsed}
              >
                <span>
                  <MdOutlineEventNote className={s.sidebarIcon} />
                </span>
              </Tooltip>

              <span className={s.sidebarText}>Active</span>
            </li>

            <li
              className={`${s.sidebarItem} ${filter === "completed" ? s.sidebarItemActive : ""}`}
              onClick={() => dispatch(setFilter("completed"))}
            >
              <Tooltip
                content="Show completed todos"
                placement="right"
                disabled={!collapsed}
              >
                <span>
                  <FaRegTrashAlt className={s.sidebarIcon} />
                </span>
              </Tooltip>

              <span className={s.sidebarText}>Trash</span>
            </li>

            <li className={s.sidebarItem} onClick={handleCreate}>
              <Tooltip
                content="Create new todo"
                placement="right"
                disabled={!collapsed}
              >
                <span>
                  <FaPlus className={s.sidebarIcon} />
                </span>
              </Tooltip>

              <span className={s.sidebarText}>Create </span>
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
    </>
  );
}
