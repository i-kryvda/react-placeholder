import { Portal } from "../Portal/Portal";
import "./Modal.scss";

export function Modal({ children }: { children: React.ReactNode }) {
  return (
    <Portal>
      <div className="modal">
        <div className="modal__overlay">
          <div className="modal__content">{children}</div>
        </div>
      </div>
    </Portal>
  );
}
