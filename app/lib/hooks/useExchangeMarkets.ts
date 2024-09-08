import { useQuery } from "@tanstack/react-query";
import { getExchangeMarkets } from "../apis/coinpaprika";

export default function useExchangeMarkets(name = "") {
  return useQuery({
    queryKey: ["exchange", name, "markets"],
    queryFn: () => getExchangeMarkets(name),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!name,
  });
}
