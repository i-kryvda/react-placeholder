import style from "./ConfirmDeleteModal.module.scss";

type ConfirmDeleteModalProps = {
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmDeleteModal({
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className={style.confirmDeleteModal}>
      <h2 className={style.confirmDeleteModalTitle}>Delete todo</h2>

      <p className={style.confirmDeleteModalQuestion}>
        Are you sure you want to delete this todo?
      </p>

      <div className={style.confirmDeleteModalButtons}>
        <button
          autoFocus
          type="button"
          onClick={() => onClose()}
          className={
            style.confirmDeleteModalButton +
            " " +
            style.confirmDeleteModalButtonConfirm
          }
        >
          Cansel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className={style.confirmDeleteModalButton}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
