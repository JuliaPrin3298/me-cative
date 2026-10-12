interface CurrencyDisplayProps {
  amount: number;
}

export function CurrencyDisplay({
  amount,
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