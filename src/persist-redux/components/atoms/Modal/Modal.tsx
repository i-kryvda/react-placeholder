import { useFocusTrap } from "@persist-redux/shared/hooks/useFocusTrap/useFocusTrap";
import style from "./Modal.module.scss";
import { useRef } from "react";

type ModalProps = {
  children: React.ReactNode;
  onOverlayClick?: () => void;
  hasOverlay?: boolean;
  isTopmost?: boolean;
};

export function Modal({
  children,
  onOverlayClick,
  hasOverlay = true,
  isTopmost = true,
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  useFocusTrap(contentRef, isTopmost);

  return (
    <div className={style.modal} ref={contentRef}>
      {hasOverlay && (
        <div className={style.modalOverlay} onClick={onOverlayClick} />
      )}
      <div
        tabIndex={-1}
        className={style.modalContent}
        role="dialog"
        aria-modal="true"
        aria-label="modal window"
      >
        {children}
      </div>
    </div>
  );
}
