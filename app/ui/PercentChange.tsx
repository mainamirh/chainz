import React from "react";
import { roundDecimalsPlaces } from "../lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";

const PercentChange = ({
  price,
  decimalPlaces,
}: {
  price: number;
  decimalPlaces: number;
}) => {
  const roundedPrice = roundDecimalsPlaces(price, decimalPlaces);

  return (
    <div
      className={`${
        roundedPrice >= 0 ? "text-[#16c784]" : "text-[#ea3943]"
      } flex items-center justify-end`}
    >
      {roundedPrice >= 0 ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
      {roundedPrice.toLocaleString()}
    </div>
  );
};

export default PercentChange;
