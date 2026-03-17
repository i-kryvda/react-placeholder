import React, { useState, useRef, useEffect } from "react";
import style from "./Tooltip.module.scss";

type Placement = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  disabled?: boolean;
  placement?: Placement;
}

const getPosition = (rect: DOMRect, placement: Placement) => {
  switch (placement) {
    case "top":
      return {
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
        transform: "translate(-50%, -100%)",
      };
    case "bottom":
      return {
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2,
        transform: "translate(-50%, 0)",
      };
    case "left":
      return {
        top: rect.top + rect.height / 2,
        left: rect.left - 8,
        transform: "translate(-100%, -50%)",
      };
    case "right":
      return {
        top: rect.top + rect.height / 2,
        left: rect.right + 8,
        transform: "translate(0, -50%)",
      };
  }
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  disabled = false,
  placement = "top",
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, transform: "" });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    setPosition(getPosition(rect, placement));
  }, [visible, placement]);

  if (disabled) return <>{children}</>;

  return (
    <div
      ref={triggerRef}
      className={style.wrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={-1}
    >
      {children}

      {visible && (
        <div
          role="tooltip"
          className={`${style.tooltip} ${visible ? style.visible : ""}`}
          style={{
            top: position.top,
            left: position.left,
            transform: position.transform,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};
