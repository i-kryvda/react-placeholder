import { RiCheckboxBlankLine } from "react-icons/ri";
import clsx from "clsx";
import s from "./EmptyState.module.scss";

export function EmptyState() {
  return (
    <div className={s.emptyState}>
      <div className={s.emptyStateHeader}>
        <RiCheckboxBlankLine size={20} aria-hidden="true" />
        <p>Empty</p>
      </div>
      <div className={s.emptyStateBody}>
        <div className={clsx(s.emptyStateBar, s.emptyStateBarLong)} />
        <div className={clsx(s.emptyStateBar, s.emptyStateBarShort)} />
      </div>
    </div>
  );
}
