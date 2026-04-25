import { useEffect, useState } from "react";
import { useIsFetching } from "@tanstack/react-query";

export const useProgressBar = () => {
  const fetching = useIsFetching();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (fetching > 0) {
      setVisible(true);

      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.random() * 10;
          return next > 90 ? 90 : next;
        });
      }, 200);
    } else {
      setProgress(100);

      setTimeout(() => {
        setVisible(false); // 👈 ховаємо
        setProgress(0); // 👈 скидаємо БЕЗ анімації
      }, 300);
    }

    return () => clearInterval(interval);
  }, [fetching]);

  return { visible, progress };
};
