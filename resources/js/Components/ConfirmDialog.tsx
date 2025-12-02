import Modal from './Modal';
import PrimaryButton from './PrimaryButton';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  onAccept: () => void;
  onClose: () => void;
  acceptButtonText?: string;
  cancelButtonText?: string;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  onAccept,
  onClose,
  acceptButtonText = 'Confirmar',
  cancelButtonText = 'Cancelar',
}: ConfirmDialogProps) {
  return (
    <Modal show={open} onClose={onClose}>
      <h5 className="font-bold text-lg">{title}</h5>
      <p className="text-gray-700 my-3">{description}</p>
      <div className="flex gap-4 justify-end">
        <PrimaryButton
          className="bg-green-600 hover:bg-green-700"
          onClick={onAccept}
        >
          {acceptButtonText}
        </PrimaryButton>
        <PrimaryButton
          className="bg-red-500 hover:bg-red-600"
          onClick={onClose}
        >
          {cancelButtonText}
        </PrimaryButton>
      </div>
    </Modal>
  );
}
