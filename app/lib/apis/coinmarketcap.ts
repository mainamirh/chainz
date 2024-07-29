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
  limit: number
): Promise<ListingLatest[]> {
  const res = await fetch(
    `${apiBaseUrl}/v1/cryptocurrency/listings/latest?limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": `${process.env.NEXT_PUBLIC_CMC_API_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data.data;
}
