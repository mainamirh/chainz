import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getCoinMarkets,
  getExchangeMarkets,
  getHistoricalTicks,
} from "@/lib/api/coinpaprika";

import type { Range } from "@/lib/types";

const fetchKeys = {
  coin: (id: string) => ["coin", id, "markets"],
  exchange: (name: string) => ["exchange", name, "markets"],
  historicalTicks: (range: Range, coinId: string) => [
    "historical",
    range,
    coinId,
  ],
} as const;

export function useCoinMarkets(id: string) {
  return useQuery({
    queryKey: [fetchKeys.coin(id)],
    queryFn: () => getCoinMarkets(id),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!id,
  });
}

export function useExchangeMarkets(name: string) {
  return useQuery({
    queryKey: [fetchKeys.exchange(name)],
    queryFn: () => getExchangeMarkets(name),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!name,
  });
}

export default function useHistoricalTicks(coinId: string, range: Range) {
  return useQuery({
    queryKey: [fetchKeys.historicalTicks(range, coinId)],
    queryFn: () => getHistoricalTicks(coinId, range),
    staleTime: 24 * 60 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: !!coinId,
  });
}
