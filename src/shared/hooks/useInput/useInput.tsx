import { useState } from "react";

export function useInput(inital: string) {
  const [value, setValue] = useState(inital);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onReset = () => setValue(inital);

  return { value, onChange, onReset };
}
