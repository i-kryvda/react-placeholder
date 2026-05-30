import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@context/app/App.tsx";
import { CounterProvider } from "./app/store/context";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CounterProvider>
      <App />
    </CounterProvider>
  </StrictMode>,
);
