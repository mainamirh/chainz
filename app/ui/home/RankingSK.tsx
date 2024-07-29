import React from "react";

const RankingSK = ({ coinCount }: { coinCount: number }) => {
  return (
    <>
      {[...Array(coinCount)].map((_, i) => (
        <tr
          className={`${
            i !== coinCount - 1
              ? "[&>td]:border-b-[1px] [&>td]:border-border"
              : "border-none"
          } [&>td]:py-5 [&>td>*]:bg-border [&>td>*]:rounded-md [&>td>*]:h-6 [&>td>*]:ml-5 animate-pulse`}
          key={i}
        >
          <td className="pl-5">
            <div className="w-3 h-6 !m-0" />
          </td>
          <td>
            <div className="!bg-transparent items-center flex gap-2 [&>*]:bg-border [&>*]:rounded-md !m-0">
              <div className="w-6 h-6 !rounded-full" />
              <div className="w-20 h-5" />
              <div className="w-7 h-4" />
            </div>
          </td>
          {[...Array(coinCount - 3)].map((_, i) => (
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
