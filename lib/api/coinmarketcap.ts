import { CMCApiBaseUrl } from "../constants";

import type {
  ExchangeIdMap,
  ExchangeMetadata,
  ListingLatest,
  Metadata,
  PriceConversion,
  QuotesLatest,
  Wallet,
} from "../types";

export async function getListingsLatest(
  start: number,
  limit: number,
): Promise<ListingLatest[]> {
  const res = await fetch(
    `${CMCApiBaseUrl}/v1/cryptocurrency/listings/latest?start=${start}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data.data;
}

export async function getMetadataV2(coinId: number): Promise<Metadata> {
  const res = await fetch(
    `${CMCApiBaseUrl}/v2/cryptocurrency/info?id=${coinId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data.data[coinId];
}

export async function getExchangesIdMap(
  limit: number,
): Promise<ExchangeIdMap[]> {
  const res = await fetch(
    `${CMCApiBaseUrl}/v1/exchange/map?limit=${limit}&sort=volume_24h`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data.data;
}

export async function getExchangesMetadata(
  ids: number[],
): Promise<{ [key: string]: ExchangeMetadata }> {
  const res = await fetch(
    `${CMCApiBaseUrl}/v1/exchange/info?id=${ids.join(",")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data.data;
}

export async function getExchangeAssets(id: number): Promise<Wallet[]> {
  const res = await fetch(`${CMCApiBaseUrl}/v1/exchange/assets?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data.data;
}

export async function getQuotesLatest(
  init?: RequestInit,
): Promise<QuotesLatest> {
  const res = await fetch(`${CMCApiBaseUrl}/v1/global-metrics/quotes/latest`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
    },
    ...init,
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data.data;
}

export async function getPriceConversionV2(
  from: string,
  to: string,
  amount: number,
): Promise<PriceConversion> {
  const res = await fetch(
    `${CMCApiBaseUrl}/v2/tools/price-conversion?id=${from}&convert_id=${to}&amount=${amount}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": `${process.env.CMC_API_KEY}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data.data;
}
