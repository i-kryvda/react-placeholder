import { useRef } from "react";
import { Portal } from "../Portal/Portal";
import { useFocusTrap } from "@shared/hooks/useFocusTrap/useFocusTrap";
import "./Modal.scss";

type ModalProps = {
  children: React.ReactNode;
  hasOverlay?: boolean;
  onOverlayClick?: () => void;
  isTopmost: boolean;
};

export function Modal({
  children,
  hasOverlay,
  onOverlayClick,
  // contentRef,
  isTopmost,
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  //  стосується конкретної модалки (її DOM елемент, її фокус)
  // логічно useFocusTrap тримати саме у Modal
  useFocusTrap(contentRef, isTopmost);

  return (
    <Portal>
      <div className="modal">
        {hasOverlay && (
          <div className="modal__overlay" onClick={onOverlayClick} />
        )}
        <div
          ref={contentRef}
          tabIndex={-1}
          className="modal__content"
          role="dialog"
          aria-modal="true"
          aria-label="modal window"
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}
