import { useState } from "react";

export function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onReset = () => {
    setValue(initialValue);
  };
  return { value, onChange, setValue, onReset };
}
