import React from "react";
import { roundDecimalsPlaces } from "../../lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";

const PercentChange = ({
  price,
  decimalPlaces,
  className,
  children,
}: {
  price: number;
  decimalPlaces: number;
  className?: string;
  children?: React.ReactNode;
}) => {
  const roundedPrice = roundDecimalsPlaces(price, decimalPlaces);

  return (
    <div
      className={`${className} ${
        roundedPrice >= 0 ? "text-[#16c784]" : "text-[#ea3943]"
      } flex items-center justify-end`}
    >
      <div className="flex items-center">
        {roundedPrice >= 0 ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
        {roundedPrice.toLocaleString()}%
      </div>
      {children}
    </div>
  );
};

export default PercentChange;
