import { useState } from "react";

export function useInput(initial: string = "") {
  const [value, setValue] = useState(initial);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onReset = () => setValue("");

  return { value, onChange, setValue, onReset, bind: { value, onChange } };
}
