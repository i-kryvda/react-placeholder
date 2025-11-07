import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [value, setValue] = useState<string>(() => {
    const saved = localStorage.getItem("input");

    return saved ? JSON.parse(saved) : "";
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const onReset = () => {
    setValue("");
    localStorage.removeItem("input");
  };

  // Зберігаємо при кожній зміні
  useEffect(() => {
    localStorage.setItem("input", JSON.stringify(value));
  }, [value]);

  return (
    <>
      <div>
        <p>main branch {value}</p>
        <button type="button" onClick={onReset}>
          reset
        </button>
      </div>

      <input
        type="text"
        className="input"
        placeholder="Enter value"
        onChange={onChange}
        value={value}
      />
    </>
  );
}
