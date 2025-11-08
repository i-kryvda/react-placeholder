import styled from "./TodoItem.module.css";

type TodosItemType = {
  id: number;
  text: string;
  onDelete: (todoId: number) => void;
};

export function TodoItem({ id, text, onDelete }: TodosItemType) {
  return (
    <li className={styled.item}>
      <p>{text}</p>
      <button type="button" onClick={() => onDelete(id)} className="button">
        Delete
      </button>
    </li>
  );
}
