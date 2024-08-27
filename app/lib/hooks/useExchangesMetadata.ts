import { useQuery } from "@tanstack/react-query";
import { getExchangesIdMap, getExchangesMetadata } from "../apis/coinmarketcap";

export default function useExchangesMetadata() {
  const limit = 10;

  const { data: exchangesIdMap } = useQuery({
    queryKey: ["exchanges", "id_map"],
    queryFn: () => getExchangesIdMap(limit),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return useQuery({
    queryKey: ["exchanges", "metadata"],
    queryFn: () =>
      getExchangesMetadata(
        exchangesIdMap?.map((exchanges) => exchanges.id) ?? [270], // Binance is the default exchange
      ),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!exchangesIdMap,
  });
}
