"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ReactMarkdown from "react-markdown";

import { Calendar, ChevronRight, Eye, PercentCircle } from "lucide-react";

import type { ExchangeMetadata } from "@/app/lib/apis/coinmarketcap";

import { regularDateFormat, compactNumber } from "@/app/lib/utils";

const ExchangeCard = ({ exchange }: { exchange: ExchangeMetadata }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/exchanges/${exchange.name.toLowerCase()}`)}
      className="relative flex cursor-pointer flex-col gap-3 overflow-hidden rounded-md border border-border bg-foreground p-[4%] shadow-md transition-colors hover:bg-foreground/40"
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
          <div className="flex items-center gap-1 rounded-md bg-background/50 p-2 text-xs text-content/80">
            Spot Volume:
            <span className="font-semibold text-content">
              &#36;
              {compactNumber(exchange.spot_volume_usd)}
            </span>
          </div>
        )}
      </div>
      <div className="relative z-10 mb-5">
        <ReactMarkdown className="prose prose-sm prose-sky pointer-events-none line-clamp-6 text-justify text-content prose-headings:text-content">
          {exchange.description}
        </ReactMarkdown>
        <div className="absolute inset-x-0 bottom-0 z-10 flex h-[50px] cursor-pointer items-end justify-center bg-gradient-to-t from-foreground/90 from-40% to-transparent text-xs text-indigo-500 backdrop-brightness-110 transition-colors hover:text-indigo-600 active:text-indigo-700">
          Read more
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>

      {exchange.fiats.length > 0 && (
        <div className="mb-5 flex items-center gap-2">
          <span className="font-semibold">Fiats:</span>
          <div
            className={`${exchange.fiats.length > 8 && "no-scrollbar overflow-x-auto shadow-[inset_25px_0px_25px_-25px,inset_-25px_0px_25px_-25px] shadow-border"} flex items-center gap-2 text-xs`}
          >
            {exchange.fiats.map((fiat) => (
              <div key={fiat} className="rounded-full bg-border p-2">
                {fiat}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="z-10 grid gap-3 sm:grid-cols-2 [&>div]:mr-2">
        <div className="flex items-center gap-1 whitespace-nowrap text-xs text-content/70">
          <Calendar className="h-4 w-4" />
          Date Launched:
          <span className="font-semibold">
            {regularDateFormat(exchange.date_launched)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-content/70">
          <Eye className="h-4 w-4" />
          Weekly Visit:
          <span className="font-semibold">
            &#36;
            {compactNumber(exchange.weekly_visits)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-content/70">
          <PercentCircle className="h-4 w-4" />
          Maker Fee:
          <span className="font-semibold">{exchange.maker_fee}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-content/70">
          <PercentCircle className="h-4 w-4" />
          Taker Fee:
          <span className="font-semibold">{exchange.taker_fee}</span>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCard;
