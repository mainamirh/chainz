// ─────────────────────────────────────────────
// Query Parameters
// ─────────────────────────────────────────────

export type GetListingsLatestQuery = {
  start: number;
  limit: number;
};

export type GetMetadataV2Query = {
  id: number;
};

export type GetExchangeIdMapQuery = {
  limit: number;
  sort: "volume_24h";
};

export type GetExchangesMetadataQuery =
  | {
      id: number[];
      slug?: never;
    }
  | {
      slug: string;
      id?: never;
    };

export type GetExchangeAssetsQuery = {
  id: number;
};

export type GetPriceConversionV2Query = {
  id: string;
  convert_id: string;
  amount: number;
};

// ─────────────────────────────────────────────
// Common Types
// ─────────────────────────────────────────────

export type Quote = {
  total_market_cap: number;
  total_volume_24h: number;
  total_volume_24h_reported: number;
  altcoin_volume_24h: number;
  altcoin_volume_24h_reported: number;
  altcoin_market_cap: number;
  defi_volume_24h: number;
  defi_volume_24h_reported: number;
  defi_24h_percentage_change: number;
  defi_market_cap: number;
  stablecoin_volume_24h: number;
  stablecoin_volume_24h_reported: number;
  stablecoin_24h_percentage_change: number;
  stablecoin_market_cap: number;
  derivatives_volume_24h: number;
  derivatives_volume_24h_reported: number;
  derivatives_24h_percentage_change: number;
  total_market_cap_yesterday: number;
  total_volume_24h_yesterday: number;
  total_market_cap_yesterday_percentage_change: number;
  total_volume_24h_yesterday_percentage_change: number;
  last_updated: string;
};

export type CryptoPlatform = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
};

export type ContractAddress = {
  contract_address: string;
  platform: {
    name: string;
    coin: CryptoPlatform;
  };
};

// ─────────────────────────────────────────────
// Cryptocurrency
// ─────────────────────────────────────────────

export type ListingLatest = {
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
  platform: unknown;
  self_reported_circulating_supply: number | null;
  self_reported_market_cap: number | null;

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
};

export type Metadata = {
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

  platform: string | null;
  date_added: string;
  twitter_username: string;
  is_hidden: number;
  date_launched: string | null;
  contract_address: ContractAddress[];
  self_reported_circulating_supply: number | null;
  self_reported_tags: string[] | null;
  self_reported_market_cap: number | null;
  infinite_supply: boolean;
};

// ─────────────────────────────────────────────
// Exchange
// ─────────────────────────────────────────────

export type ExchangeMetadata = {
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
};

export type ExchangeIdMap = {
  first_historical_data: string;
  id: number;
  is_active: number;
  is_listed: number;
  is_redistributable: number;
  last_historical_data: string;
  name: string;
  slug: string;
};

// ─────────────────────────────────────────────
// Wallet
// ─────────────────────────────────────────────

export type Wallet = {
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
};

// ─────────────────────────────────────────────
// Market Quotes
// ─────────────────────────────────────────────

export type QuotesLatest = {
  active_cryptocurrencies: number;
  total_cryptocurrencies: number;
  active_market_pairs: number;
  active_exchanges: number;
  total_exchanges: number;
  eth_dominance: number;
  btc_dominance: number;
  eth_dominance_yesterday: number;
  btc_dominance_yesterday: number;
  eth_dominance_24h_percentage_change: number;
  btc_dominance_24h_percentage_change: number;
  defi_volume_24h: number;
  defi_volume_24h_reported: number;
  defi_market_cap: number;
  defi_24h_percentage_change: number;
  stablecoin_volume_24h: number;
  stablecoin_volume_24h_reported: number;
  stablecoin_market_cap: number;
  stablecoin_24h_percentage_change: number;
  derivatives_volume_24h: number;
  derivatives_volume_24h_reported: number;
  derivatives_market_cap: number;
  derivatives_24h_percentage_change: number;

  quote: {
    USD: Quote;
    [key: string]: Quote;
  };

  last_updated: string;
};

// ─────────────────────────────────────────────
// Price Conversion
// ─────────────────────────────────────────────

export type PriceConversion = {
  id: number;
  symbol: string;
  name: string;
  amount: number;
  last_updated: string;

  quote: {
    [convertId: string]: {
      price: number;
      last_updated: string;
    };
  };
};
