import { useQuery } from "@tanstack/react-query";
import { getCoinMarkets } from "../apis/coinpaprika";

export default function useCoinMarkets(id = "") {
  return useQuery({
    queryKey: ["coin", id, "markets"],
    queryFn: () => getCoinMarkets(id),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!id,
  });
}
