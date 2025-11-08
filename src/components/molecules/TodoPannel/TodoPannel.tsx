import { useInput } from "@shared/hooks/useInput/useInput";

type TodoPannelType = {
  add: (text: string) => void;
};

export function TodoPannel({ add }: TodoPannelType) {
  const { value, onChange, onReset } = useInput("");

  const handleAdd = () => {
    add(value);
    onReset();
  };

  return (
    <>
      <div className="todos__pannel">
        <input
          type="text"
          placeholder="Create todo"
          value={value}
          onChange={onChange}
        />
        <button type="button" onClick={handleAdd}>
          ADD
        </button>
      </div>
    </>
  );
}
