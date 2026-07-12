import { useRouteError } from "react-router";
import styles from "./GlobalError.module.scss";

export function GlobalError() {
  const error = useRouteError();

  return (
    <div className={styles.wrapper}>
      <h1 className="title">⚠️ Something went wrong</h1>

      <pre>{error instanceof Error ? error.message : "Unknown error"}</pre>

      <div className={styles.buttons}>
        <button onClick={() => window.location.reload()}>Reload</button>

        <button onClick={() => (window.location.href = "/")}>Go home</button>
      </div>
    </div>
  );
}
