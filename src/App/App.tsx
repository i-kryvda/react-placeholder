import { useAppDispatch, useAppSelector } from "./store/store";
import { toggleView } from "./store/todos/todos.slice";
import { Panel, List, Cards } from "@components/organisms";
// import { Counter } from "@components/organisms";
import { Header, Footer, Counter } from "@components/templates";
import { Button } from "@components/atoms/Button/ui/Button";

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

            <div style={{ marginBottom: 30 }}>
              <Button onClick={() => dispatch(toggleView())}>View</Button>
            </div>

            <div style={{ marginBottom: 30 }}>
              <Panel />
            </div>

            {view === "card" ? <Cards /> : <List />}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
