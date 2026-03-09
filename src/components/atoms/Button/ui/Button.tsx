import clsx from "clsx";
import styles from "./Button.module.scss";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  type = "button",
  variant = "primary",
  size = "sm",
  children,
  className,
  icon,
  isLoading,
  ...props
}: Props) {
  return (
    <button
      {...props}
      type={type}
      className={clsx(styles.button, styles[variant], styles[size], className)}
      disabled={props.disabled || isLoading}
    >
      {isLoading && <span className={styles.loader} />}
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}
