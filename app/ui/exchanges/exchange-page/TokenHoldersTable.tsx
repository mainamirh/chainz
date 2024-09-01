"use client";

import TokenHoldersRow from "./TokenHoldersRow";

import useExchangeAssets from "@/app/lib/hooks/useExchangeAssets";
import { roundDecimalsPlaces } from "@/app/lib/utils";

const TokenHoldersTable = ({ exchangeId }: { exchangeId: number }) => {
  const { data: tokenHolders } = useExchangeAssets(exchangeId);

  tokenHolders?.sort(
    (a, b) =>
      b.balance * b.currency.price_usd - a.balance * a.currency.price_usd,
  );

  const totalValue = tokenHolders?.reduce(
    (acc, curr) => acc + curr.balance * curr.currency.price_usd,
    0,
  );

  return (
    <div className="flex w-4/6 flex-col gap-5 overflow-auto rounded-xl border border-border bg-foreground p-5 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-lg font-semibold">
          Total:
          {totalValue ? (
            <span>${roundDecimalsPlaces(totalValue, 2).toLocaleString()}</span>
          ) : (
            <div className="h-[21px] w-[170px] animate-pulse rounded bg-border" />
          )}
        </div>
        <ul className="text-xs font-medium text-content/40 [&>li]:before:mr-1 [&>li]:before:content-['*']">
          <li>
            Only wallets containing at least 100,000 USD in balance are shown
          </li>
          <li>Balances from wallets might be delayed</li>
        </ul>
      </div>

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
          {tokenHolders &&
            tokenHolders.map(
              (data, i) =>
                i < 10 && (
                  <tr
                    className={`${
                      i !== tokenHolders.length - 1
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
