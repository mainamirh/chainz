import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getListingsLatest } from "../../lib/apis/coinmarketcap";

export default function useListingLatest(page = 1, limit = 20) {
  const startOffset = (page - 1) * limit + 1;

  return useQuery({
    queryKey: ["listings", "latest", page],
    queryFn: () => getListingsLatest(startOffset, limit),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
    // refetchInterval: 60 * 1000,
  });
}
