import { Modal } from "@shared/helpers/Modal/Modal";
import { createContext, useContext, useState } from "react";

type ModalType = {
  id: string;
  content: React.ReactNode;
};

type ModalContextType = {
  openModal: (content: React.ReactNode) => void;
  closeModal: (id: string) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function useModalManager() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalManager have a problem");
  }
  return context;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = useState<ModalType[]>([]);

  const openModal = (content: React.ReactNode) => {
    const modal: ModalType = {
      id: crypto.randomUUID(),
      content,
    };
    setModals((prev) => [...prev, modal]);
  };

  const closeModal = (id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modals.map((modal) => (
        <Modal key={modal.id}>{modal.content}</Modal>
      ))}
    </ModalContext.Provider>
  );
}
