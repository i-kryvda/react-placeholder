import s from "./TodoEditor.module.scss";

export function TodoEditor({ onClose }: { onClose: () => void }) {
  return (
    <form className={s.editor}>
      <div className={s.editorBody}>
        <label
          htmlFor="todo-title"
          className="todo-editor__label visually-hidden"
        >
          Title
        </label>

        <input
          type="text"
          id="todo-title"
          className={`${s.editorField} ${s.editorFieldTitle}`}
          placeholder="Create title..."
        />

        <label
          htmlFor="todo-description"
          className="todo-editor__label visually-hidden"
        >
          Description
        </label>

        <input
          type="text"
          id="todo-description"
          className={`${s.editorField} ${s.editorFieldDescription}`}
          placeholder="Optional description..."
        />
      </div>

      <div className={s.editorFooter}>
        <button
          type="button"
          className={`${s.editorBtn} ${s.editorBtnSecondary}`}
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={`${s.editorBtn} ${s.editorBtnPrimary}`}
        >
          Add task
        </button>
      </div>
    </form>
  );
}
