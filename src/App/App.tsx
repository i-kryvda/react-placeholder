import {
  useModalManager,
  ModalProvider,
} from "./context/ModalProvider/ModalProvider";

import "./App.css";

import Button from "@components/atoms/Button/Button";

function AppProvider() {
  const { openModal } = useModalManager();

  return (
    <div>
      <Button onClick={() => openModal("modal1")} />
      <Button onClick={() => openModal("modal2")} />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ModalProvider>
        <AppProvider></AppProvider>
      </ModalProvider>
    </>
  );
}
