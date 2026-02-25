import { createRoot } from "react-dom/client";
import { ModalProvider } from "@app/context/ModalManager/ModalManager.tsx";

import App from "@app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <ModalProvider>
    <App />
  </ModalProvider>,
);
