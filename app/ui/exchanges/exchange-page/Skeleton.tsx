export const HeaderSK = () => {
  return (
    <div className="relative grid h-fit grid-cols-1 items-center gap-y-9 p-[2%] md:grid-cols-2 lg:grid-cols-3">
      <div className="absolute inset-0 -z-10 rounded bg-border/10" />

      <div className="flex animate-pulse items-center gap-3">
        <div className="aspect-square w-[49px] rounded-full bg-border" />

        <div className="h-[24px] w-[65px] rounded bg-border" />
      </div>

      <div className="col-span-1 grid grid-cols-subgrid gap-y-9 md:col-span-2">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">Spot Trading Volume(24h)</span>
          <div className="h-[34px] w-2/3 animate-pulse rounded bg-border" />

          <div className="flex items-center text-base text-content/70">
            <div className="h-[24px] w-[100px] animate-pulse rounded bg-border" />
            &nbsp;BTC
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">Total assets</span>
          <div className="h-[34px] w-2/3 animate-pulse rounded bg-border" />
        </div>
      </div>
    </div>
  );
};

export const LinksSK = () => {
  return (
    <div className="top-[90px] flex w-full flex-col gap-2 lg:sticky lg:w-1/5">
      <h4 className="text-base font-medium">Links:</h4>

      <div className="flex flex-col gap-2">
        {[...Array(1)].map((_, i) => (
          <div
            key={i}
            className="h-[19px] w-[130px] animate-pulse rounded bg-border"
          />
        ))}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-[19px] w-[80px] animate-pulse rounded bg-border"
          />
        ))}
      </div>
    </div>
  );
};

export const DescriptionSK = () => {
  return (
    <div className="flex w-full flex-col gap-6 lg:w-4/5">
      <div className="flex flex-col gap-2">
        {[...Array(1)].map((_, i) => (
          <div
            key={i}
            className="h-[30px] w-1/3 animate-pulse rounded bg-border"
          />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-[19px] animate-pulse rounded bg-border" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {[...Array(1)].map((_, i) => (
          <div
            key={i}
            className="h-[19px] w-1/2 animate-pulse rounded bg-border"
          />
        ))}
      </div>
    </div>
  );
};
