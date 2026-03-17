import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@persist-legacy/app/store/store";
import App from "@persist-legacy/app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
