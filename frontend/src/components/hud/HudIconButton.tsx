interface HudIconButtonProps {
  label: string;
  icon: string;
  onClick: () => void;
  active?: boolean;
}

export function HudIconButton({
  label,
  icon,
  onClick,
  active = false,
}: HudIconButtonProps) {
  return (
    <button
      type="button"
      className={`hud-icon-button${active ? " is-active" : ""}`}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
    >
      <img src={icon} alt="" />
    </button>
  );
}