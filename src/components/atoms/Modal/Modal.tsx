import { AnimatePresence, motion } from "motion/react";
import Portal from "@shared/Portal/Portal";
import { useEffect, useState } from "react";
import { useLockBodyScroll } from "@shared/hooks/useLockBodyScroll/useLockBodyScroll";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  activeModal?: ModalNane;
};

type ModalNane = "modal1" | "modal2" | null;

import "./Modal.css";

export default function Modal({
  isOpen,
  onClose,
  children,
  activeModal,
}: ModalProps) {
  const [shouldLockScroll, setShouldLockScroll] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldLockScroll(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, isOpen]);

  useLockBodyScroll(shouldLockScroll);
  return (
    <Portal>
      <AnimatePresence
        initial={false}
        onExitComplete={() => setShouldLockScroll(false)}
      >
        {isOpen && (
          <motion.div key={activeModal} className="modal">
            <motion.div
              className="modal__overlay"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.div
                className="modal__content"
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1], // трохи м'якша плавність
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
