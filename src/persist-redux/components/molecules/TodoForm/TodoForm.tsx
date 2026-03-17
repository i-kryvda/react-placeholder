// import { createTodo } from "@persist-redux/app/store/todos/todos-slice";
// import { useAppDispatch } from "@persist-redux/app/store/store";
import { useInput } from "@persist-redux/shared/hooks/useInput/useInput";
// --- STYLES ---
import s from "./TodoForm.module.scss";
import { useEffect, useRef, useState } from "react";
import { MAX_TITLE_LENGTH, validateTitle } from "./lib/validateTodo";
import { useFieldError } from "./hook/useFieldError";

type TodoFormProps = {
  onClose?: () => void;
  onSubmit: (data: { title: string; description?: string }) => void;
  initialTitle?: string;
  submitText?: string;
  initialDescription?: string;
};

export function TodoForm({
  onClose,
  onSubmit,
  initialTitle = "",
  initialDescription = "",
  submitText = "Save",
}: TodoFormProps) {
  const ref = useRef<HTMLInputElement>(null);

  const {
    value: title,
    onChange: onChangeTitle,
    onReset: onResetTitle,
  } = useInput(initialTitle);
  const {
    value: description,
    onChange: onChangeDescription,
    onReset: onResetDescription,
  } = useInput(initialDescription);

  const {
    error: titleError,
    visibleError,
    hasError,
  } = useFieldError(title, validateTitle);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleError) return;

    const trimmedTitle = title.trim();
    onSubmit({ title: trimmedTitle, description });
    onResetTitle();
    onResetDescription();
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <form className={s.editor} onSubmit={handleSubmit}>
      <div className={s.titleCounter}>
        {title.length} / {MAX_TITLE_LENGTH}
      </div>

      <div className={s.editorBody}>
        <label
          htmlFor="todo-title"
          className="todo-editor__label visually-hidden"
        >
          Title
        </label>

        <input
          required
          aria-invalid={hasError}
          aria-describedby={hasError ? "todo-title-error" : undefined}
          type="text"
          id="todo-title"
          className={`${s.editorField} ${s.editorFieldTitle}`}
          placeholder="Title is required"
          value={title}
          onChange={onChangeTitle}
          ref={ref}
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
          value={description}
          onChange={onChangeDescription}
        />
      </div>

      <div className={s.editorFooter}>
        <p
          id="todo-title-error"
          className={s.error}
          style={{
            opacity: hasError ? 1 : 0,
            transform: hasError
              ? "translateX(0) scale(1)"
              : "translateX(-200px) scale(0)",
          }}
        >
          {visibleError}
        </p>

        <div className={s.editorButtons}>
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
            disabled={hasError || !title.trim()}
          >
            {submitText}
          </button>
        </div>
      </div>
    </form>
  );
}
