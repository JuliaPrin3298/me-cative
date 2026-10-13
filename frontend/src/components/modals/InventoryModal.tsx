import { ModalBase } from "./ModalBase";

interface Props {
  onClose: () => void;
}

export function InventoryModal({ onClose }: Props) {
  return (
    <ModalBase title="Mochila — Inventário e loja" onClose={onClose}>
      <div className="modal-placeholder">
        <p>Área do inventário e da loja.</p>
        <p>Futuramente: itens, compras e moedas.</p>
      </div>
    </ModalBase>
  );
}