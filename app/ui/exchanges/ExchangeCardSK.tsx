import { Calendar, Eye, PercentCircle } from "lucide-react";

const ExchangeCardSK = () => {
  return (
    <div className="relative flex flex-col gap-3 rounded-md border border-border bg-foreground p-[4%] shadow-md">
      <div className="flex items-center justify-between gap-2">
        <div className="flex animate-pulse items-center gap-2">
          <div className="aspect-square w-[37px] rounded-full bg-border" />

          <div className="h-[20px] w-[65px] rounded bg-border" />
        </div>

        <div className="flex items-center gap-1 rounded-md bg-background/50 p-2 text-xs text-content/80">
          Spot Volume:
          <div className="h-[14px] w-[40px] animate-pulse rounded bg-border" />
        </div>
      </div>
      <div className="mb-5 flex animate-pulse flex-col gap-2">
        <div className="h-[18px] w-1/3 rounded bg-border" />

        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[13px] rounded bg-border" />
        ))}
      </div>

      <div className="mb-5 flex items-center gap-2">
        <span className="font-semibold">Fiats:</span>
        <div className="flex animate-pulse items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="aspect-square w-[33px] rounded-full bg-border p-2"
            />
          ))}
        </div>
      </div>

      <div className="z-10 grid gap-3 sm:grid-cols-2 [&>div]:mr-2">
        <div className="flex items-center gap-1 whitespace-nowrap text-xs text-content/70">
          <Calendar className="h-4 w-4" />
          Date Launched:
          <div className="h-[14px] w-[56px] animate-pulse rounded bg-border" />
        </div>
        <div className="flex items-center gap-1 text-xs text-content/70">
          <Eye className="h-4 w-4" />
          Weekly Visit:
          <div className="h-[14px] w-[48px] animate-pulse rounded bg-border" />
        </div>
        <div className="flex items-center gap-1 text-xs text-content/70">
          <PercentCircle className="h-4 w-4" />
          Maker Fee:
          <div className="h-[14px] w-[30px] animate-pulse rounded bg-border" />
        </div>
        <div className="flex items-center gap-1 text-xs text-content/70">
          <PercentCircle className="h-4 w-4" />
          Taker Fee:
          <div className="h-[14px] w-[30px] animate-pulse rounded bg-border" />
        </div>
      </div>
    </div>
  );
};

export default ExchangeCardSK;
