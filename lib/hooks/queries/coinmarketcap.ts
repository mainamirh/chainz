import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getExchangeAssets,
  getExchangesIdMap,
  getExchangesMetadata,
  getListingsLatest,
  getMetadataV2,
  getPriceConversionV2,
} from "@/lib/api/coinmarketcap";

const fetchKeys = {
  exchange: (id: number) => ["exchange", id, "assets"],
  idMap: "exchanges/id_map",
  exchangeMetadata: "exchanges/metadata",
  listingLatest: (page: number, limit: number) => [
    "listingLatest",
    page,
    limit,
  ],
  coinMetadata: (coinId: number) => ["metadata", coinId],
  priceConversion: (from_id: string, to_id: string, amount: number) => [
    "priceConversion",
    from_id,
    to_id,
    amount,
  ],
} as const;

export function useExchangeAssets(id: number) {
  return useQuery({
    queryKey: [fetchKeys.exchange(id)],
    queryFn: () => getExchangeAssets({ id }),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!id,
  });
}

function useExchangesIdMap(limit: number) {
  return useQuery({
    queryKey: [fetchKeys.idMap],
    queryFn: () => getExchangesIdMap({ limit, sort: "volume_24h" }),
    staleTime: 24 * 60 * 60 * 1000,
  });
}

export function useExchangesMetadata() {
  const { data: exchangesIdMap } = useExchangesIdMap(10);

  const ids = exchangesIdMap?.map((exchanges) => exchanges.id) ?? [];

  return useQuery({
    queryKey: [fetchKeys.exchangeMetadata],
    queryFn: () => getExchangesMetadata({ id: ids }),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!ids.length,
  });
}

export function useListingLatest(page = 1, limit = 20) {
  const startOffset = (page - 1) * limit + 1;

  return useQuery({
    queryKey: [fetchKeys.listingLatest(page, limit)],
    queryFn: () => getListingsLatest({ start: startOffset, limit }),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
    // refetchInterval: 60 * 1000,
  });
}

export function useMetadata(coinId: number) {
  return useQuery({
    queryKey: [fetchKeys.coinMetadata(coinId)],
    queryFn: () => getMetadataV2({ id: coinId }),
    staleTime: 24 * 60 * 60 * 1000,
  });
}

export function usePriceConversion(from_id = "", to_id = "", amount = 0) {
  return useQuery({
    queryKey: [fetchKeys.priceConversion(from_id, to_id, amount)],
    queryFn: () =>
      getPriceConversionV2({ id: from_id, convert_id: to_id, amount }),
    staleTime: 1 * 60 * 1000,
    enabled: !!from_id && !!to_id && !!amount,
  });
}
