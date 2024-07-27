const apiBaseUrl = "https://api.binance.com";

export const binanceIcon =
  "https://cryptoradar.com/storage/brokers/GP0yOaQuDVhB9RYtLkJbVLRAS9Oq9ZoAX2AVImfJ.optimized.svg";

interface SymbolOrderbook {
  symbol: string;
  bidPrice: number;
  bidQty: number;
  askPrice: number;
  askQty: number;
}

export async function getSymbolsOrderbook(
  symbols: string[]
): Promise<SymbolOrderbook[]> {
  const params = new URLSearchParams();
  params.append("symbols", JSON.stringify(symbols));

  const res = await fetch(`${apiBaseUrl}/api/v3/ticker/bookTicker?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data;
}
