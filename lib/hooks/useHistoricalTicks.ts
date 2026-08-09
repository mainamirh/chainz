import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getHistoricalTicks } from "../api/coinpaprika";

import type { Range } from "../types";

export default function useHistoricalTicks(coinId = "", range: Range) {
  return useQuery({
    queryKey: ["historical", range, coinId],
    queryFn: () => getHistoricalTicks(coinId, range),
    staleTime: 24 * 60 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: !!coinId,
  });
}
