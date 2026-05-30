import { Counter } from "@redux/components/Counter/Counter";
import "./App.css";

export default function App() {
  return (
    <>
      <header className="header">
        <div className="header__container">header</div>
      </header>
      <main className="main">
        <div className="main__container">
          <div className="main__title">Counter Redux vanilla</div>
          <Counter></Counter>
        </div>
      </main>
      <footer className="footer">
        <div className="footer__container">footer</div>
      </footer>
    </>
  );
}
