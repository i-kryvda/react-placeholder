import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Portal({ children }: { children: React.ReactNode }) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  // const root = document.getElementById("modal-root")!;
  useEffect(() => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    setNode(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  if (!node) return null;

  return createPortal(children, document.body);
}
