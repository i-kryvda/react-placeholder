import { useAppDispatch, useAppSelector } from "./store/store";
import { toggleView } from "./store/todos/todos.slice";
import { Panel, List, Cards } from "@persist-legacy/components/organisms";
import { Counter } from "@persist-legacy/components/molecules/Counter/Counter";
import { Header, Footer } from "@persist-legacy/components/templates";

import "./App.scss";

export default function App() {
  const { view } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  return (
    <>
      <Header />
      <main className="main">
        <section className="todos" style={{ marginTop: 30 }}>
          <div className="todos__container">
            <Counter />

            <button type="button" onClick={() => dispatch(toggleView())}>
              BUTTON
            </button>

            <Panel />
            {view === "card" ? <Cards /> : <List />}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
