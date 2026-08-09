"use server";

import { fetcher, buildQueryParams } from "../utils";

import { CMCApiBaseUrl } from "../constants";

import type {
  ExchangeIdMap,
  ExchangeMetadata,
  GetExchangeAssetsQuery,
  GetExchangeIdMapQuery,
  GetExchangesMetadataQuery,
  GetListingsLatestQuery,
  GetMetadataV2Query,
  GetPriceConversionV2Query,
  ListingLatest,
  Metadata,
  PriceConversion,
  QuotesLatest,
  Wallet,
} from "../types";

export async function getListingsLatest(
  query: GetListingsLatestQuery,
): Promise<ListingLatest[]> {
  const params = buildQueryParams(query);

  const res = await fetcher<{ data: ListingLatest[] }>(
    `${CMCApiBaseUrl}/v1/cryptocurrency/listings/latest?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
      },
    },
  );

  return res.data;
}

export async function getMetadataV2(
  query: GetMetadataV2Query,
): Promise<Metadata> {
  const params = buildQueryParams(query);

  const res = await fetcher<{ data: Record<string, Metadata> }>(
    `${CMCApiBaseUrl}/v2/cryptocurrency/info?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
      },
    },
  );

  return res.data[query.id];
}

export async function getExchangesIdMap(
  query: GetExchangeIdMapQuery,
): Promise<ExchangeIdMap[]> {
  const params = buildQueryParams(query);

  const res = await fetcher<{ data: ExchangeIdMap[] }>(
    `${CMCApiBaseUrl}/v1/exchange/map?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
      },
    },
  );

  return res.data;
}

export async function getExchangesMetadata(
  query: GetExchangesMetadataQuery,
): Promise<{ [key: string]: ExchangeMetadata }> {
  const params = buildQueryParams(query);

  const res = await fetcher<{ data: { [key: string]: ExchangeMetadata } }>(
    `${CMCApiBaseUrl}/v1/exchange/info?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
      },
    },
  );

  return res.data;
}

export async function getExchangeAssets(
  query: GetExchangeAssetsQuery,
): Promise<Wallet[]> {
  const params = buildQueryParams(query);

  const res = await fetcher<{ data: Wallet[] }>(
    `${CMCApiBaseUrl}/v1/exchange/assets?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
      },
    },
  );

  return res.data;
}

export async function getQuotesLatest(
  options: RequestInit,
): Promise<QuotesLatest> {
  const res = await fetcher<{ data: QuotesLatest }>(
    `${CMCApiBaseUrl}/v1/global-metrics/quotes/latest`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
      },
      ...options,
    },
  );

  return res.data;
}

export async function getPriceConversionV2(
  query: GetPriceConversionV2Query,
): Promise<PriceConversion> {
  const params = buildQueryParams(query);

  const res = await fetcher<{ data: PriceConversion }>(
    `${CMCApiBaseUrl}/v2/tools/price-conversion?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
      },
    },
  );

  return res.data;
}
