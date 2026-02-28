import { Portal } from "../Portal/Portal";
import "./Modal.scss";

type ModalProps = {
  children: React.ReactNode;
  hasOverlay?: boolean;
  onOverlayClick?: () => void;
  contentRef?: React.RefObject<HTMLDivElement | null>;
};

export function Modal({
  children,
  hasOverlay,
  onOverlayClick,
  contentRef,
}: ModalProps) {
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
