export const MarketSK = ({
  numberOfCurrencyPerPage,
}: {
  numberOfCurrencyPerPage: number;
}) => {
  return (
    <>
      {[...Array(numberOfCurrencyPerPage)].map((_, i) => (
        <tr
          className={`${
            i !== numberOfCurrencyPerPage - 1
              ? "[&>td]:border-b-[1px] [&>td]:border-border"
              : "border-none"
          } [&>td>div]:animate-pulse [&>td]:py-4`}
          key={i}
        >
          <td className="pl-4">
            <div className="h-[24px] w-[10px] rounded-md bg-border" />
          </td>
          <td>
            <div className="flex items-center gap-2">
              <div className="relative shrink-0">
                <div className="aspect-square h-[24px] rounded-full bg-border" />
              </div>
              <div className="h-[20px] w-[80px] rounded bg-border" />
            </div>
          </td>
          <td>
            <div className="mr-auto h-[22px] w-4/5 rounded bg-border" />
          </td>
          <td>
            <div className="ml-auto h-[22px] w-4/5 rounded bg-border" />
          </td>
          <td>
            <div className="ml-auto h-[22px] w-4/5 rounded bg-border" />
          </td>
          <td>
            <div className="ml-auto h-[22px] w-4/5 rounded bg-border" />
          </td>
          <td>
            <div className="ml-auto h-[22px] w-4/5 rounded bg-border" />
          </td>
          <td>
            <div className="ml-auto h-[22px] w-4/5 rounded bg-border" />
          </td>
        </tr>
      ))}
    </>
  );
};

export const RecommendationSK = () => {
  return (
    <div className="flex w-[340px] shrink-0 flex-col gap-3 rounded-xl border border-border bg-foreground p-5 shadow-md">
      <div className="h-[15px] w-[66px] animate-pulse rounded bg-border" />

      <div className="flex animate-pulse items-center justify-between">
        <div className="h-[35px] w-[132px] rounded bg-border" />

        <div className="h-[15px] w-[65px] rounded bg-border" />
      </div>

      <div className="h-[16px] animate-pulse rounded bg-border" />

      <div className="h-[20px] w-1/2 animate-pulse rounded bg-border" />
    </div>
  );
};
