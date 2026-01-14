import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@app/context/ThemeProvider/ThemeProvider";

import App from "@app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
