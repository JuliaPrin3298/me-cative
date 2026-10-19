
interface CurrencyDisplayProps {
  amount?: number;
}

export function CurrencyDisplay({
  amount = 0,
}: CurrencyDisplayProps) {
  return (
    <div className="currency-display">
      <img
        src="/assets/ui/starCoin.png"
        alt=""
        className="currency-icon"
      />

      <span>
        {amount.toLocaleString("pt-BR")}
      </span>
    </div>
  );
}
