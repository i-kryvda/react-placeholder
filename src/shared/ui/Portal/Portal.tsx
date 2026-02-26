import { createPortal } from "react-dom";

export function Portal({ children }: { children: React.ReactNode }) {
  const root = document.getElementById("modal-root")!;
  return createPortal(children, root);
}
