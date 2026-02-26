import { Portal } from "../Portal/Portal";
import "./Modal.scss";

type ModalProps = {
  children: React.ReactNode;
  hasOverlay?: boolean;
  onOverlayClick?: () => void;
};

export function Modal({ children, hasOverlay, onOverlayClick }: ModalProps) {
  return (
    <Portal>
      <div className="modal">
        {hasOverlay && (
          <div className="modal__overlay" onClick={onOverlayClick} />
        )}
        <div className="modal__content">{children}</div>
      </div>
    </Portal>
  );
}
