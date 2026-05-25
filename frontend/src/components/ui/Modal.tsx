interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export const Modal = ({
  isOpen,
  title,
  message,
  onClose
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>{title}</h2>
        <p>{message}</p>

        <button
          className="button"
          onClick={onClose}
        >
          Retour à l’accueil
        </button>

      </div>
    </div>
  );
};