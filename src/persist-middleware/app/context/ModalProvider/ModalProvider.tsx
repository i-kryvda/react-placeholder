import { createContext, useCallback, useContext, useState } from "react";
import { Modal } from "@persist-middleware/components/atoms/Modal/Modal";
import { useLockScroll } from "@persist-middleware/shared/hooks/useLockScroll/useLockScroll";
import { useKeyEscape } from "@persist-middleware/shared/hooks/useKeyEscape/useKeyEscape";

type ModalContextType = {
  openModal: (
    render: (id: string) => React.ReactNode,
    options?: OpenModalOptions,
  ) => string;
  closeModal: (id: string) => void;
};

type OpenModalOptions = {
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
};

type ModalType = {
  id: string;
  content: React.ReactNode;
  closeOnEscape: boolean;
  closeOnOverlayClick: boolean;
  isTopmost?: boolean;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export function useModalStack() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalStack have a problem");
  }
  return context;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = useState<ModalType[]>([]);

  const openModal = (
    render: (id: string) => React.ReactNode,
    options?: OpenModalOptions,
  ) => {
    const id = crypto.randomUUID();
    setModals((prev) => [
      ...prev,
      {
        id,
        content: render(id),
        closeOnEscape: options?.closeOnEscape ?? true,
        closeOnOverlayClick: options?.closeOnOverlayClick ?? true,
      },
    ]);
    return id;
  };

  const closeModal = (id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  };

  const closeTopModal = useCallback(() => {
    setModals((prev) => prev.slice(0, -1));
  }, []);

  const handleEscape = useCallback(() => {
    const topModal = modals[modals.length - 1];
    if (topModal?.closeOnEscape) closeTopModal();
  }, [modals, closeTopModal]);

  useLockScroll(modals.length > 0);
  useKeyEscape(handleEscape, modals.length > 0);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modals.map((modal) => (
        <Modal
          key={modal.id}
          hasOverlay={modals[modals.length - 1].id === modal.id}
          onOverlayClick={() => modal.closeOnOverlayClick && closeTopModal()}
          isTopmost={modals[modals.length - 1].id === modal.id}
        >
          {modal.content}
        </Modal>
      ))}
    </ModalContext.Provider>
  );
}
