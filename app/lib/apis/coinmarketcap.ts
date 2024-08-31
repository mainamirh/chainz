"use server";

const apiBaseUrl = "https://pro-api.coinmarketcap.com";

export interface ListingLatest {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  infinite_supply: boolean;
  last_updated: string;
  date_added: string;
  tags: string[];
  platform: any; // Adjust as needed
  self_reported_circulating_supply: any; // Adjust as needed
  self_reported_market_cap: any; // Adjust as needed
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      volume_change_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      market_cap: number;
      market_cap_dominance: number;
      fully_diluted_market_cap: number;
      last_updated: string;
    };
  };
}

export async function getListingsLatest(
  limit: number,
): Promise<ListingLatest[]> {
  const res = await fetch(
    `${apiBaseUrl}/v1/cryptocurrency/listings/latest?limit=${limit}`,
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

export interface Metadata {
  id: number;
  name: string;
  symbol: string;
  category: string;
  description: string;
  slug: string;
  logo: string;
  subreddit: string;
  notice: string;
  tags: string[];
  tagNames: string[];
  tagGroups: string[];
  urls: {
    website: string[];
    twitter: string[];
    message_board: string[];
    chat: string[];
    facebook: string[];
    explorer: string[];
    reddit: string[];
    technical_doc: string[];
    source_code: string[];
    announcement: string[];
  };
  platform: null | string;
  date_added: string;
  twitter_username: string;
  is_hidden: number;
  date_launched: null | string;
  contract_address: {
    contract_address: string;
    platform: {
      name: string;
      coin: {
        id: string;
        name: string;
        symbol: string;
        slug: string;
      };
    };
  }[];
  self_reported_circulating_supply: null | number;
  self_reported_tags: null | string[];
  self_reported_market_cap: null | number;
  infinite_supply: boolean;
}

export async function getMetadataV2(coinId: number): Promise<Metadata> {
  const res = await fetch(`${apiBaseUrl}/v2/cryptocurrency/info?id=${coinId}`, {
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

  return data.data[coinId];
}

interface ExchangeIdMap {
  first_historical_data: string;
  id: number;
  is_active: number;
  is_listed: number;
  is_redistributable: number;
  last_historical_data: string;
  name: string;
  slug: string;
}

export async function getExchangesIdMap(
  limit: number,
): Promise<ExchangeIdMap[]> {
  const res = await fetch(
    `${apiBaseUrl}/v1/exchange/map?limit=${limit}&sort=volume_24h`,
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

export interface ExchangeMetadata {
  id: number;
  name: string;
  slug: string;
  description: string;
  notice: string;
  logo: string;
  countries: string[];
  fiats: string[];
  urls: {
    fee: string[];
    actual: string[];
    chat: string[];
    website: string[];
    blog: string[];
    twitter: string[];
  };
  tags: string[];
  type: string;
  porStatus: number;
  porAuditStatus: number;
  walletSourceStatus: number;
  porSwitch: string;
  date_launched: string;
  is_hidden: number;
  is_redistributable: number;
  maker_fee: number;
  taker_fee: number;
  spot_volume_usd: number;
  spot_volume_last_updated: string;
  weekly_visits: number;
}

export async function getExchangesMetadata(
  ids: number[],
): Promise<{ [key: string]: ExchangeMetadata }> {
  const res = await fetch(
    `${apiBaseUrl}/v1/exchange/info?id=${ids.join(",")}`,
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

export interface Wallet {
  wallet_address: string;
  balance: number;
  platform: {
    crypto_id: number;
    symbol: string;
    name: string;
  };
  currency: {
    crypto_id: number;
    price_usd: number;
    symbol: string;
    name: string;
  };
}

export async function getExchangeAssets(id: number): Promise<Wallet[]> {
  const res = await fetch(`${apiBaseUrl}/v1/exchange/assets?id=${id}`, {
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
