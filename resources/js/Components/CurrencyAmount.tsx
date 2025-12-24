type CurrencyAmountProps = {
    value: number | string;
    symbolSrc?: string;
    size?: number;
    className?: string;
};

export default function CurrencyAmount({
   value,
   symbolSrc = "/storage/icons/currency_symbol.webp",
   size = 20,
   className = "",
}: CurrencyAmountProps) {
    return (
        <span className={`d-flex align-items-center justify-content-center ${className}`}>
            {value}
            <img
                src={symbolSrc}
                alt="Currency Symbol"
                style={{ maxHeight: size }}
                className="ml-1"
            />
        </span>
    );
}
