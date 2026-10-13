import { ModalBase } from "./ModalBase";

interface Props {
  onClose: () => void;
}

export function FeedingModal({ onClose }: Props) {
  return (
    <ModalBase title="Hora de comer" onClose={onClose}>
      <div className="modal-placeholder">
        <p>Área da raposa e das comidas disponíveis na cesta.</p>
      </div>
    </ModalBase>
  );
}