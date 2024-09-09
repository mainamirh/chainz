const MarketSK = ({
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

export default MarketSK;
