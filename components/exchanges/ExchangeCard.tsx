"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ReactMarkdown from "react-markdown";

import { Calendar, ChevronRight, Eye, PercentCircle } from "lucide-react";

import type { ExchangeMetadata } from "@/types";

import { regularDateFormat, compactNumber } from "@/lib/utils";

const ExchangeCard = ({ exchange }: { exchange: ExchangeMetadata }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/exchanges/${exchange.name.toLowerCase()}`)}
      className="border-border bg-foreground hover:bg-foreground/40 relative flex cursor-pointer flex-col gap-3 overflow-hidden rounded-md border p-[4%] shadow-md transition-colors"
    >
      <div
        style={{
          backgroundImage: `url(${exchange.logo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-x-0 top-0 h-[30px] blur-[70px]"
      />

      <div className="z-10 flex items-center justify-between gap-2">
        <Link
          href={`/exchanges/${exchange.name.toLowerCase()}`}
          className="flex items-center gap-2"
        >
          <Image
            src={exchange.logo}
            alt={`${exchange.name}-icon`}
            width={40}
            height={40}
            className="aspect-auto"
          />
          <div className="text-base font-semibold">{exchange.name}</div>
        </Link>

        {exchange.spot_volume_usd && (
          <div className="bg-background/50 text-content/80 flex items-center gap-1 rounded-md p-2 text-xs">
            Spot Volume:
            <span className="text-content font-semibold">
              &#36;
              {compactNumber(exchange.spot_volume_usd)}
            </span>
          </div>
        )}
      </div>
      <div className="relative z-10 mb-5">
        <div className="prose prose-sm prose-sky text-content prose-headings:text-content pointer-events-none line-clamp-6 text-justify">
          <ReactMarkdown>{exchange.description}</ReactMarkdown>
        </div>
        <div className="from-foreground/90 absolute inset-x-0 bottom-0 z-10 flex h-[50px] cursor-pointer items-end justify-center bg-linear-to-t from-40% to-transparent text-xs text-indigo-500 backdrop-brightness-110 transition-colors hover:text-indigo-600 active:text-indigo-700">
          Read more
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>

      {exchange.fiats.length > 0 && (
        <div className="mb-5 flex items-center gap-2">
          <span className="font-semibold">Fiats:</span>
          <div
            className={`${exchange.fiats.length > 8 && "no-scrollbar shadow-border overflow-x-auto shadow-[inset_25px_0px_25px_-25px,inset_-25px_0px_25px_-25px]"} flex items-center gap-2 text-xs`}
          >
            {exchange.fiats.map((fiat) => (
              <div key={fiat} className="bg-border rounded-full p-2">
                {fiat}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="z-10 grid gap-3 sm:grid-cols-2 [&>div]:mr-2">
        <div className="text-content/70 flex items-center gap-1 text-xs whitespace-nowrap">
          <Calendar className="h-4 w-4" />
          Date Launched:
          <span className="font-semibold">
            {regularDateFormat(exchange.date_launched)}
          </span>
        </div>
        <div className="text-content/70 flex items-center gap-1 text-xs">
          <Eye className="h-4 w-4" />
          Weekly Visit:
          <span className="font-semibold">
            &#36;
            {compactNumber(exchange.weekly_visits)}
          </span>
        </div>
        <div className="text-content/70 flex items-center gap-1 text-xs">
          <PercentCircle className="h-4 w-4" />
          Maker Fee:
          <span className="font-semibold">{exchange.maker_fee}</span>
        </div>
        <div className="text-content/70 flex items-center gap-1 text-xs">
          <PercentCircle className="h-4 w-4" />
          Taker Fee:
          <span className="font-semibold">{exchange.taker_fee}</span>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCard;
