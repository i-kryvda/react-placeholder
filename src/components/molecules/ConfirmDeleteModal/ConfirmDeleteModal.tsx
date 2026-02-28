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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <h2>Are you sure?</h2>

      <div style={{ display: "flex", gap: 10 }}>
        <button autoFocus type="button" onClick={handleConfirm}>
          Yes
        </button>
        <button type="button" onClick={() => onClose()}>
          No
        </button>
      </div>
    </div>
  );
}
