import { useEffect, useState } from "react";

type Validator = (value: string) => string;

export function useFieldError(value: string, validator: Validator) {
  const error = validator(value);
  const [visibleError, setVisibleError] = useState("");

  useEffect(() => {
    if (error) {
      setVisibleError(error);
      return;
    }

    const timer = setTimeout(() => {
      setVisibleError("");
    }, 300);

    return () => clearTimeout(timer);
  }, [error]);

  return { error, visibleError, hasError: !!error };
}
