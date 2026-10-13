import { ModalBase } from "./ModalBase";

interface Props {
  onClose: () => void;
}

export function RestModal({ onClose }: Props) {
  return (
    <ModalBase title="Hora de descansar" onClose={onClose}>
      <div className="modal-placeholder">
        <p>Área do cenário noturno e da caminha sob a árvore.</p>
      </div>
    </ModalBase>
  );
}