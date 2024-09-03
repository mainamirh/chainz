import { useQuery } from "@tanstack/react-query";
import { getExchangeAssets } from "../apis/coinmarketcap";

export default function useExchangeAssets(id = 0) {
  return useQuery({
    queryKey: ["exchange", id, "assets"],
    queryFn: () => getExchangeAssets(id),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!id,
  });
}
