import { TodoList } from "@persist-redux/components/templates/TodoList/TodoList";
import { TodoPannel } from "@persist-redux/components/templates/TodoPannel/TodoPannel";
import { Footer } from "@persist-redux/components/templates/Footer/Footer";
import { Header } from "@persist-redux/components/templates/Header/Header";
import { Sidebar } from "@persist-redux/components/templates/Sidebar/Sidebar";
import { useEffect, useState } from "react";

export function TodoPage() {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) return saved === "true";
    // return window.innerWidth < 768; // мобільне за замовчуванням закрите
    return true;
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed.toString());
  }, [collapsed]);

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={() => setCollapsed((p) => !p)}
      />
      <div className={`app ${collapsed ? "appCollapsed" : ""}`}>
        <Header />
        <main className="main">
          <div className="main__container">
            <TodoPannel />
            <TodoList />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
