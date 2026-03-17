import { createRoot } from "react-dom/client";
import { ModalProvider } from "@app/context/ModalManager/ModalManager";

import App from "@app/App";

createRoot(document.getElementById("root")!).render(
  <ModalProvider>
    <App />
  </ModalProvider>,
);
