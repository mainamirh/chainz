import { useQuery } from "@tanstack/react-query";
import { getMetadataV2 } from "../api/coinmarketcap";

export default function useMetadata(coinId: number) {
  return useQuery({
    queryKey: ["metadata", coinId],
    queryFn: () => getMetadataV2(coinId),
    staleTime: 24 * 60 * 60 * 1000,
  });
}
