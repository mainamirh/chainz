"use client";

import { useEffect, useState } from "react";

import Button from "./common/Button";
import Dropdown from "./common/Dropdown";

import useListingLatest from "../lib/hooks/useListingLatest";
import usePriceConversion from "../lib/hooks/usePriceConversion";
import { useDebounce } from "use-debounce";

import { ArrowDownUp, LoaderCircle } from "lucide-react";

type Option = { id: number; name: string; symbol: string };
type Convert = {
  from?: Option;
  to?: Option;
  fromAmount?: number;
  toAmount?: number;
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
    debouncedConvert?.from?.id.toString(),
    debouncedConvert?.to?.id.toString(),
    debouncedConvert?.fromAmount,
  );

  const dropDownOptions = listingLatest?.map((coin) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
  }));

  useEffect(() => {
    if (!conversion) return;

    setConvert((prev) => {
      const convert_id = prev.to?.id;

      if (
        !convert_id ||
        !conversion.quote[convert_id] ||
        conversion.quote[convert_id].price <= 0
      )
        return prev;

      return { ...prev, toAmount: conversion.quote[convert_id].price };
    });
  }, [conversion]);

  function reverseConversion() {
    if (!conversion) return;

    setConvert((prev) => {
      const convert_id = prev.to?.id;
      if (
        !convert_id ||
        !conversion.quote[convert_id] ||
        conversion.quote[convert_id].price <= 0
      )
        return prev;

      return {
        ...prev,
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
        minimumFractionDigits: 4,
        maximumSignificantDigits: 7,
      })
        .format(number)
        .replace(/[^0-9.-]+/g, ""),
    );
  }

  return (
    <div className="flex select-none flex-col gap-1 rounded-xl border border-border bg-foreground/90 p-2 shadow-md backdrop-blur-md">
      <label htmlFor="currency-converter" className="p-2 text-sm font-medium">
        Cryptocurrency Converter
      </label>
      <div id="currency-converter" className="relative flex flex-col gap-1">
        <div className="flex items-center gap-3 rounded-xl bg-border/40 p-4">
          <input
            type="number"
            placeholder="0"
            value={formatInputNumber(Number(convert.fromAmount))}
            onChange={(e) => {
              const value = e.target.value;
              setConvert((prev) => ({
                ...prev,
                fromAmount: value === "" ? undefined : parseFloat(value),
              }));
            }}
            className="no-arrow grow bg-transparent text-xl font-medium outline-none"
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
          className="absolute left-1/2 top-1/2 z-10 w-fit -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-foreground p-2 transition-colors hover:bg-border"
        >
          {isFetching ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            <ArrowDownUp className="h-5 w-5" />
          )}
        </div>

        <div className="relative flex items-center gap-3 rounded-xl bg-border/40 p-4">
          <input
            type="number"
            placeholder=""
            value={convert.toAmount ? formatInputNumber(convert.toAmount) : ""}
            disabled
            className={`${isFetching && "animate-pulse"} no-arrow grow bg-transparent text-xl font-medium outline-none disabled:text-content/70`}
            onWheel={(e) => e.currentTarget.blur()}
          />

          {isFetching && !convert.toAmount && (
            <div className="absolute h-[20px] w-[100px] animate-pulse rounded bg-border" />
          )}

          <Dropdown
            options={dropDownOptions}
            selected={convert.to}
            onChange={(value) => setConvert((prev) => ({ ...prev, to: value }))}
            placeHolder="Select Coin"
          />
        </div>
      </div>
      <Button
        onClick={() => refetch()}
        className="rounded-xl text-base"
        type="button"
      >
        Refresh
      </Button>
    </div>
  );
};

export default PriceConverter;
