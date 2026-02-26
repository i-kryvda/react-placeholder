import { Modal } from "@shared/ui/Modal/Modal";
import { createContext, useCallback, useContext, useState } from "react";
import { useLockBodyScroll } from "@shared/hooks/useLockBodyScroll/useLockBodyScroll";
import { useKeyEscape } from "@shared/hooks/useKeyEscape/useKeyEscape";

type ModalType = {
  id: string;
  render: (id: string) => React.ReactNode;
};

type ModalContextType = {
  openModal: (render: (id: string) => React.ReactNode) => string;
  closeModal: (id: string) => void;
  closeTopModal: () => void;
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

  const openModal = (render: (id: string) => React.ReactNode): string => {
    const id = crypto.randomUUID();
    setModals((prev) => [...prev, { id, render }]);
    return id;
  };

  const closeModal = (id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  };

  const closeTopModal = useCallback(() => {
    setModals((prev) => prev.slice(0, -1));
  }, []);

  useLockBodyScroll(modals.length > 0);
  useKeyEscape(closeTopModal, modals.length > 0);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeTopModal }}>
      {children}
      {modals.map((modal, index) => (
        <Modal
          key={modal.id}
          hasOverlay={index === modals.length - 1}
          onOverlayClick={closeTopModal}
        >
          {modal.render(modal.id)}
        </Modal>
      ))}
    </ModalContext.Provider>
  );
}
