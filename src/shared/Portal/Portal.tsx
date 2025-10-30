import ReactDOM from "react-dom";

import React, { useState, useEffect } from "react";

type PortalProps = {
  children: React.ReactNode;
};

export default function Portal({ children }: PortalProps) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    // if (!children) return;

    const div = document.createElement("div");
    document.body.appendChild(div);
    setNode(div);

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  if (!node) return null;

  return ReactDOM.createPortal(children, node);
}
