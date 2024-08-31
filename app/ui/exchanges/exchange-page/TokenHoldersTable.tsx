"use client";

import TokenHoldersRow from "./TokenHoldersRow";

import useExchangeAssets from "@/app/lib/hooks/useExchangeAssets";

const TokenHoldersTable = ({ exchangeId }: { exchangeId: number }) => {
  const { data: TokenHolders } = useExchangeAssets(exchangeId);

  TokenHolders?.sort(
    (a, b) =>
      b.balance * b.currency.price_usd - a.balance * a.currency.price_usd,
  );

  return (
    <div className="w-4/6 overflow-auto rounded-xl border border-border bg-foreground p-5 shadow-md">
      <table className="w-full table-fixed whitespace-nowrap">
        <thead>
          <tr className="[&>th]:border-y-[1px] [&>th]:border-border [&>th]:py-3 [&>th]:text-end [&>th]:text-xs [&>th]:font-semibold">
            <th className="w-[150px] pl-4 !text-start">Token</th>
            <th className="w-[130px]">Balance</th>
            <th className="w-[90px]">Price</th>
            <th className="w-[110px]">Value</th>
          </tr>
        </thead>
        <tbody>
          {TokenHolders &&
            TokenHolders.map(
              (data, i) =>
                i < 10 && (
                  <tr
                    className={`${
                      i !== TokenHolders.length - 1
                        ? "[&>td]:border-b-[1px] [&>td]:border-border"
                        : "border-none"
                    } [&>td]:py-4 [&>td]:text-end [&>td]:text-sm [&>td]:font-medium`}
                    key={data.wallet_address.concat(i.toString())}
                  >
                    <TokenHoldersRow tokenHolder={data} />
                  </tr>
                ),
            )}
          {/* {isPending && <RankingSK numberOfCoins={numberOfCoins} />} */}
        </tbody>
      </table>
    </div>
  );
};

export default TokenHoldersTable;
