import { useModalManager } from "@app/context/ModalManager/ModalManager";

type ConfirmDeleteModalProps = {
  onConfirm: () => void;
  modalId: string;
};

export function ConfirmDeleteModal({
  onConfirm,
  modalId,
}: ConfirmDeleteModalProps) {
  const { closeModal } = useModalManager();

  const handleConfirm = () => {
    onConfirm();
    closeModal(modalId);
  };

  return (
    <div>
      <p>Are you sure?</p>
      <button type="button" onClick={handleConfirm}>
        Yes
      </button>
      <button type="button" onClick={() => closeModal(modalId)}>
        No
      </button>
    </div>
  );
}
