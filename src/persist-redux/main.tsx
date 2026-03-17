import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@persist-redux/app/context/ThemeProvider/ThemeProvider.tsx";
import { ModalProvider } from "@persist-redux/app/context/ModalProvider/ModalProvider.tsx";
import { persistor, store } from "@persist-redux/app/store/store.tsx";
import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
