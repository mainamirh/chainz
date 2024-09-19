import { useQuery } from "@tanstack/react-query";
import { getPriceConversionV2 } from "../apis/coinmarketcap";

export default function usePriceConversion(
  from_id = "",
  to_id = "",
  amount = 0,
) {
  return useQuery({
    queryKey: ["priceConversion", from_id, to_id, amount],
    queryFn: () => getPriceConversionV2(from_id, to_id, amount),
    staleTime: 1 * 60 * 1000,
    enabled: !!from_id && !!to_id && !!amount,
  });
}
