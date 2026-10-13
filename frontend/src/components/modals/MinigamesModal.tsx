import { ModalBase } from "./ModalBase";

interface MinigamesModalProps {
  onClose: () => void;
}

export function MinigamesModal({ onClose }: MinigamesModalProps) {
  return (
    <ModalBase title="Minijogos" onClose={onClose}>
      <p>Escolha um jogo para se divertir!</p>

      {/* Os cards dos jogos serão adicionados aqui */}
      <div className="modal-placeholder">
        Em breve: minijogos do Me Cative.
      </div>
    </ModalBase>
  );
}