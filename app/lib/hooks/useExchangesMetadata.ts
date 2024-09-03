import { useQuery } from "@tanstack/react-query";
import { getExchangesIdMap, getExchangesMetadata } from "../apis/coinmarketcap";

export default function useExchangesMetadata() {
  const limit = 10;

  const { data } = useQuery({
    queryKey: ["exchanges", "id_map"],
    queryFn: () => getExchangesIdMap(limit),
    staleTime: 24 * 60 * 60 * 1000,
  });

  const exchangesIdMap = data?.map((exchanges) => exchanges.id) ?? [];

  return useQuery({
    queryKey: ["exchanges", "metadata"],
    queryFn: () => getExchangesMetadata(exchangesIdMap),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!exchangesIdMap.length,
  });
}
