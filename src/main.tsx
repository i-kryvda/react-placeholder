import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./app/providers/RouterProvider";
// import App from "@/app/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
