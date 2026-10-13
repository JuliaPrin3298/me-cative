
import { ModalBase } from "./ModalBase";

interface Props {
  onClose: () => void;
}

export function BrushModal({ onClose }: Props) {
  return (
    <ModalBase title="Cuidar da raposa" onClose={onClose}>
      <div className="modal-placeholder">
        <p>Área da raposa e da interação com o pente.</p>
        <p>Futuramente: pentear e atualizar a aparência.</p>
      </div>
    </ModalBase>
  );
}
