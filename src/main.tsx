import { createRoot } from "react-dom/client";
import { QueryProvider } from "@app/providers/with-query";

import App from "@app/App";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <App />
  </QueryProvider>,
);
