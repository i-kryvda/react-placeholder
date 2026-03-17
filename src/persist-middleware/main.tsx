import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@persist-middleware/app/context/ThemeProvider/ThemeProvider.tsx";
import { ModalProvider } from "@persist-middleware/app/context/ModalProvider/ModalProvider.tsx";
import { store } from "@persist-middleware/app/store/store.tsx";
import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </ThemeProvider>,
);
