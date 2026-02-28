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
    <div>
      <h2>Are you sure?</h2>
      <button type="button" onClick={handleConfirm}>
        Yes
      </button>
      <button type="button" onClick={() => onClose()}>
        No
      </button>
    </div>
  );
}
