import { useQuery } from "@tanstack/react-query";
import { getListingsLatest } from "../../lib/apis/coinmarketcap";

export default function useListingLatest() {
  const numberOfCoins = 10;

  return {
    numberOfCoins,
    ...useQuery({
      queryKey: ["listings", "latest"],
      queryFn: () => getListingsLatest(numberOfCoins),
      staleTime: 60 * 1000,
      // refetchInterval: 60 * 1000,
    }),
  };
}
