export type GetSymbolsOrderbookQuery = {
  symbols: string[];
};

export type SymbolOrderbook = {
  symbol: string;
  bidPrice: number;
  bidQty: number;
  askPrice: number;
  askQty: number;
};
