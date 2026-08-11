"use client";

import { useState } from "react";

import Button from "./common/Button";
import Dropdown from "./common/Dropdown";

import { useListingLatest, usePriceConversion } from "@/hooks/queries";

import { useDebounce } from "use-debounce";

import { ArrowDownUp, LoaderCircle } from "lucide-react";

type Option = { id: number; name: string; symbol: string };

type Convert = {
  from?: Option;
  to?: Option;
  fromAmount?: number;
};

const PriceConverter = () => {
  const [convert, setConvert] = useState<Convert>({});
  const [debouncedConvert] = useDebounce(convert, 500);

  const { data: listingLatest } = useListingLatest();

  const {
    data: conversion,
    isFetching,
    refetch,
  } = usePriceConversion(
    debouncedConvert.from?.id.toString(),
    debouncedConvert.to?.id.toString(),
    debouncedConvert.fromAmount,
  );

  const dropDownOptions = listingLatest?.map((coin) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
  }));

  function reverseConversion() {
    if (!conversion) return;

    setConvert((prev) => {
      const convert_id = prev.to?.id;
      if (!convert_id) return prev;

      return {
        from: prev.to,
        to: prev.from,
        fromAmount: conversion.quote[convert_id].price,
        toAmount: prev.fromAmount,
      };
    });
  }

  function formatInputNumber(number: number | undefined) {
    if (number === undefined || isNaN(number)) return "";

    return parseFloat(
      new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 5,
      }).format(number),
    );
  }

  return (
    <div className="border-border bg-foreground/90 flex flex-col gap-1 rounded-xl border p-2 shadow-md backdrop-blur-md select-none">
      <label
        htmlFor="currency-converter"
        className="p-2 text-xs font-medium md:text-sm"
      >
        Cryptocurrency Converter
      </label>
      <div id="currency-converter" className="relative flex flex-col gap-1">
        <div className="bg-border/40 flex items-center justify-between gap-3 rounded-xl p-4">
          <input
            type="number"
            placeholder="0"
            value={formatInputNumber(convert.fromAmount)}
            onChange={(e) => {
              setConvert((prev) => ({
                ...prev,
                fromAmount: parseFloat(e.target.value),
              }));
            }}
            className="no-arrow w-full bg-transparent text-lg font-medium outline-hidden md:text-xl"
            onWheel={(e) => e.currentTarget.blur()}
          />
          <Dropdown
            options={dropDownOptions}
            selected={convert.from}
            onChange={(value) =>
              setConvert((prev) => ({ ...prev, from: value }))
            }
            placeHolder="Select Coin"
          />
        </div>

        <div
          onClick={reverseConversion}
          className="bg-foreground hover:bg-border absolute top-1/2 left-1/2 z-10 w-fit -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full p-2 transition-colors"
        >
          {isFetching ? (
            <LoaderCircle className="h-4 w-4 animate-spin md:h-5 md:w-5" />
          ) : (
            <ArrowDownUp className="h-4 w-4 md:h-5 md:w-5" />
          )}
        </div>

        <div className="bg-border/40 relative flex items-center justify-between gap-3 rounded-xl p-4">
          <div className="text-content/70 w-full bg-transparent text-lg font-medium md:text-xl">
            <span className={isFetching ? "animate-pulse" : "animate-none"}>
              {formatInputNumber(conversion?.quote[convert.to?.id ?? 0]?.price)}
            </span>
          </div>

          <Dropdown
            options={dropDownOptions}
            selected={convert.to}
            onChange={(value) => setConvert((prev) => ({ ...prev, to: value }))}
            placeHolder="Select Coin"
          />
        </div>
      </div>
      <Button
        disabled={
          !convert.from || !convert.to || !convert.fromAmount || isFetching
        }
        onClick={() => refetch()}
        className="rounded-xl disabled:pointer-events-none disabled:opacity-70"
        type="button"
      >
        Refresh
      </Button>
    </div>
  );
};

export default PriceConverter;
