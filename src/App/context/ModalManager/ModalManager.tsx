import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import type { ModalContextType, ModalType, OpenModalOptions } from "./types";
import { Modal } from "@shared/ui/Modal/Modal";
import { useLockBodyScroll } from "@shared/hooks/useLockBodyScroll/useLockBodyScroll";
import { useKeyEscape } from "@shared/hooks/useKeyEscape/useKeyEscape";
import { useFocusTrap } from "@shared/hooks/useFocusTrap/useFocusTrap";

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
  const contentRef = useRef<HTMLDivElement | null>(null);

  const openModal = (
    // цей прийом має назву "render prop" і він дозволяє модалу отримувати свій id, який генерується в openModal, щоб потім використовувати його для закриття саме цього модала
    render: (id: string) => React.ReactNode,
    options?: OpenModalOptions,
  ): string => {
    const newModal: ModalType = {
      id: crypto.randomUUID(),
      render,
      closeOnOverlayClick: options?.closeOnOverlayClick ?? true,
      closeOnEscape: options?.closeOnEscape ?? true,
    };
    setModals((prev) => [...prev, newModal]);
    return newModal.id;
  };

  const closeModal = (id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  };

  const closeTopModal = useCallback(() => {
    // закриває верхній модал, який завжди буде останнім в масиві modals
    setModals((prev) => prev.slice(0, -1));
  }, []);

  // useCallback потрібен бо useKeyEscape має залежність deps handlers
  const handleEscape = useCallback(() => {
    const topModal = modals[modals.length - 1];
    if (topModal?.closeOnEscape) closeTopModal();
  }, [modals, closeTopModal]);

  useLockBodyScroll(modals.length > 0);
  useKeyEscape(handleEscape, modals.length > 0);
  useFocusTrap(contentRef, modals.length > 0);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeTopModal }}>
      {children}
      {modals.map((modal, index) => (
        <Modal
          key={modal.id}
          hasOverlay={index === modals.length - 1} // только верхний модал имеет оверлей
          onOverlayClick={() => {
            // если кликнули по оверлею верхнего модала и он разрешает закрываться по клику, то закрываем его
            if (modal.closeOnOverlayClick) closeTopModal();
          }}
          contentRef={contentRef}
        >
          {modal.render(modal.id)}
        </Modal>
      ))}
    </ModalContext.Provider>
  );
}
