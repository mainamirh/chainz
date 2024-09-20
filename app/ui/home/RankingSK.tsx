const RankingSK = ({ numberOfCoins }: { numberOfCoins: number }) => {
  return (
    <>
      {[...Array(numberOfCoins)].map((_, i) => (
        <tr
          className={`${
            i !== numberOfCoins - 1
              ? "[&>td]:border-b-[1px] [&>td]:border-border"
              : "border-none"
          } animate-pulse [&>td>*]:ml-5 [&>td>*]:h-6 [&>td>*]:rounded-md [&>td>*]:bg-border [&>td]:py-4`}
          key={i}
        >
          <td className="pl-5">
            <div className="!m-0 h-6 w-3" />
          </td>
          <td>
            <div className="!m-0 flex items-center gap-2 !bg-transparent [&>*]:rounded-md [&>*]:bg-border">
              <div className="h-6 w-6 !rounded-full" />
              <div className="h-5 w-20" />
              <div className="h-4 w-7" />
            </div>
          </td>
          {[...Array(numberOfCoins - 3)].map((_, i) => (
            <td key={i}>
              <div />
            </td>
          ))}
          <td>
            <div className="!h-[50px]" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default RankingSK;
