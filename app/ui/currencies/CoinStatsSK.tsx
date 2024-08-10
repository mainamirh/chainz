const CoinStatsSK = () => {
  return (
    <section className="flex flex-col w-full shadow-md items-start bg-foreground rounded-xl gap-6 border border-border p-6">
      <div className="flex items-center gap-2 animate-pulse">
        <div className="w-6 h-6 rounded-full bg-border" />

        <div className="flex items-baseline gap-2 [&>div]:bg-border">
          <div className="w-[65px] h-[23px] rounded" />
          <div className="w-[32px] h-[17px] rounded" />
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 animate-pulse">
        <div className="w-[205px] h-[35px] rounded bg-border" />
        <div className="w-[75px] h-[16px] rounded bg-border" />
      </div>
      <>
        <MetadataDescriptionSK />
      </>

      <div className="flex flex-col w-full gap-2 text-xs md:text-sm">
        <span>Official Links</span>
        <MetadataOfficialLinksSK />
      </div>

      <div className="flex flex-col w-full gap-2 text-xs md:text-sm">
        <span>Socials</span>
        <MetadataSocialsSK />
      </div>

      <div className="flex flex-col w-full gap-2 text-xs md:text-sm">
        <span>Network information</span>
        <MetadataNetworkSK />
      </div>
    </section>
  );
};

export default CoinStatsSK;

export const MetadataDescriptionSK = () => {
  const lines = 6;
  return (
    <div className="animate-pulse w-full flex flex-col gap-2">
      {[...Array(lines)].map((_, i) =>
        i === lines - 1 ? (
          <div key={i} className="w-1/2 h-4 bg-border rounded" />
        ) : (
          <div key={i} className="w-full h-4 bg-border rounded" />
        )
      )}
    </div>
  );
};

export const MetadataOfficialLinksSK = () => {
  const lines = 2;
  return (
    <div className="animate-pulse w-full flex flex-wrap gap-2">
      {[...Array(lines)].map((_, i) => (
        <div key={i} className="w-1/3 h-6 bg-border rounded" />
      ))}
    </div>
  );
};

export const MetadataSocialsSK = () => {
  const lines = 3;
  return (
    <div className="animate-pulse w-full flex flex-wrap gap-2">
      {[...Array(lines)].map((_, i) => (
        <div key={i} className="w-1/4 h-6 bg-border rounded" />
      ))}
    </div>
  );
};

export const MetadataNetworkSK = () => {
  const lines = 4;
  return (
    <div className="animate-pulse w-full flex flex-wrap gap-2">
      {[...Array(lines)].map((_, i) => {
        return <div key={i} className="w-5/12 h-6 bg-border rounded" />;
      })}
    </div>
  );
};
