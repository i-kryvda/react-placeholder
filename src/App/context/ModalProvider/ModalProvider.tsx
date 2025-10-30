import { createContext, useState, useContext } from "react";
import Modal from "@components/atoms/Modal/Modal";

type ModalNane = "modal1" | "modal2" | null;

type ModalContextType = {
  activeModal: ModalNane;
  openModal: (name: ModalNane) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalNane>(null);

  const openModal = (name: ModalNane) => setActiveModal(name);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
      <Modal isOpen={activeModal === "modal1"} onClose={closeModal}>
        <h3>modal 1</h3>
        <div>Зміст можна винести в окремий компонент</div>
      </Modal>
      <Modal
        isOpen={activeModal === "modal2"}
        onClose={closeModal}
        activeModal={activeModal}
      >
        <h3>modal 2</h3>
        <div>Зміст можна винести в окремий компонент</div>
      </Modal>
    </ModalContext.Provider>
  );
}

export const useModalManager = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalManager must be used within a ModalProvider");
  }
  return context;
};
