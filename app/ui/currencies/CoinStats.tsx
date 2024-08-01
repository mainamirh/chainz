"use client";

import Image from "next/image";
import Link from "next/link";

import { coinLogo } from "@/app/lib/definitions";
import PercentChange from "../common/PercentChange";
import useMetadata from "@/app/lib/hooks/useMetadata";

import {
  Github,
  StickyNote,
  Globe,
  Twitter,
  Bot,
  Facebook,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

import type { ListingLatest } from "@/app/lib/apis/coinmarketcap";

import { linkToATag } from "@/app/lib/utils";
import {
  MetadataDescriptionSK,
  MetadataNetworkSK,
  MetadataOfficialLinksSK,
  MetadataSocialsSK,
} from "./CoinStatsSK";

const CoinStats = ({ currency }: { currency: ListingLatest }) => {
  const { data: metadata } = useMetadata(currency.id);

  return (
    <section className="flex flex-col w-full shadow-md items-start bg-foreground rounded-xl gap-6 border border-border p-6">
      <div className="flex items-center gap-2">
        <Image
          src={coinLogo(currency.id)}
          alt="coin-icon"
          width={24}
          height={24}
          className="aspect-auto"
        />
        <div className="flex items-baseline gap-2">
          <div className="text-lg font-semibold">{currency.name}</div>
          <div className="text-sm font-medium text-content/70">
            {currency.symbol}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3">
        <div className="font-bold text-4xl">
          $
          {currency.quote.USD.price.toLocaleString("en-US", {
            maximumFractionDigits: currency.quote.USD.price > 1.0 ? 2 : 4,
            minimumFractionDigits: 2,
          })}
        </div>

        <PercentChange
          price={currency.quote.USD.percent_change_24h}
          decimalPlaces={2}
          className="gap-1 font-medium text-sm"
        >
          <span>(1d)</span>
        </PercentChange>
      </div>

      {metadata ? (
        <p
          className="[&>a]:text-blue-400 text-sm md:text-base text-justify hover:[&>a]:text-blue-500 [&>a]:transition-colors [&>a]:text-sm"
          dangerouslySetInnerHTML={{
            __html: linkToATag(metadata.description),
          }}
        />
      ) : (
        <MetadataDescriptionSK />
      )}

      <div className="flex flex-col w-full gap-2 text-xs md:text-sm">
        <span>Official Links</span>
        {metadata ? (
          <div className="flex items-center flex-wrap gap-4 text-blue-400">
            {metadata.urls.website.map((url) => (
              <Link
                key={url}
                href={url}
                target="_blank"
                className="flex items-center gap-1 hover:text-blue-500 transition-opacity"
              >
                <Globe className="w-4 h-4" />
                {url.slice(0, url.length - 1)}
              </Link>
            ))}
            {metadata.urls.technical_doc.map((url) => (
              <Link
                href={url}
                target="_blank"
                key={url}
                className="flex items-center gap-1 hover:text-blue-500 transition-opacity"
              >
                <StickyNote className="w-4 h-4" />
                Whitepaper
              </Link>
            ))}

            {metadata.urls.source_code.map((url) => (
              <Link
                href={url}
                target="_blank"
                key={url}
                className="flex items-center gap-1 hover:text-blue-500 transition-opacity"
              >
                <Github className="w-4 h-4" />
                Github
              </Link>
            ))}
          </div>
        ) : (
          <MetadataOfficialLinksSK />
        )}
      </div>

      <div className="flex flex-col w-full gap-2 text-xs md:text-sm">
        <span>Socials</span>
        {metadata ? (
          <div className="flex items-center flex-wrap gap-4 text-blue-400">
            {metadata.urls.twitter.map((url) => (
              <Link
                href={url}
                target="_blank"
                key={url}
                className="flex items-center gap-1 hover:text-blue-500 transition-opacity"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </Link>
            ))}
            {metadata.urls.reddit.map((url) => (
              <Link
                href={url}
                target="_blank"
                key={url}
                className="flex items-center gap-1 hover:text-blue-500 transition-opacity"
              >
                <Bot className="w-4 h-4" />
                Reddit
              </Link>
            ))}

            {metadata.urls.facebook.map((url) => (
              <Link
                href={url}
                target="_blank"
                key={url}
                className="flex items-center gap-1 hover:text-blue-500 transition-opacity"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </Link>
            ))}

            {metadata.urls.chat.map((url) => (
              <Link
                href={url}
                target="_blank"
                key={url}
                className="flex items-center gap-1 hover:text-blue-500 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" />
                {url.split("/").indexOf("discord") !== -1 ? "Discord" : "Chat"}
              </Link>
            ))}
          </div>
        ) : (
          <MetadataSocialsSK />
        )}
      </div>

      <div className="flex flex-col w-full gap-2 text-xs md:text-sm">
        <span>Network information</span>
        {metadata ? (
          <div className="flex items-center flex-wrap gap-4 text-blue-400">
            {metadata.urls.explorer.map((url) => (
              <Link
                href={url}
                target="_blank"
                key={url}
                className="flex items-center gap-1 hover:text-blue-500 transition-opacity"
              >
                {url.replace("https://", "").split("/")[0]}
                <ExternalLink className="w-4 h-4" />
              </Link>
            ))}
          </div>
        ) : (
          <MetadataNetworkSK />
        )}
      </div>
    </section>
  );
};

export default CoinStats;
