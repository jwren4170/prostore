import { cn } from "@/lib/utils";

const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  const stringValue = value.toFixed(2);
  const [integer, decimal] = stringValue.split(".");

  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-sm align-super">$</span>
      {integer}
      <span className="text-sm align-super">.{decimal}</span>
    </p>
  );
};

export default ProductPrice;
