"use client";

import Link from "next/link";

import {
  Link as LinkIcon,
  MessageCircle,
  Rss,
  Scale,
  Twitter,
} from "lucide-react";

type Url = {
  website: string[];
  fee: string[];
  chat: string[];
  twitter: string[];
  blog: string[];
  actual: string[];
};

const Links = ({ exchangeName, urls }: { exchangeName: string; urls: Url }) => {
  return (
    <div className="top-[90px] flex w-full flex-col gap-2 lg:sticky lg:w-1/5">
      <h4 className="text-base font-medium">Links:</h4>

      {urls.website.length > 0 && (
        <div className="flex flex-col gap-2 text-sm text-blue-400">
          {urls.website.map((url) => (
            <Link
              key={url}
              href={url}
              target="_blank"
              className="flex items-center gap-1 transition-colors hover:text-blue-500"
            >
              <LinkIcon className="h-4 w-4" />
              {url.slice(0, url.length - 1)}
            </Link>
          ))}
        </div>
      )}

      {urls.fee.length > 0 && (
        <div className="flex flex-col gap-2 text-sm text-blue-400">
          {urls.fee.map((url) => (
            <Link
              key={url}
              href={url}
              target="_blank"
              className="flex items-center gap-1 transition-colors hover:text-blue-500"
            >
              <Scale className="h-4 w-4" />
              Fees
            </Link>
          ))}
        </div>
      )}

      {urls.chat.length > 0 && (
        <div className="flex flex-col gap-2 text-sm text-blue-400">
          {urls.chat.map((url) => (
            <Link
              key={url}
              href={url}
              target="_blank"
              className="flex items-center gap-1 transition-colors hover:text-blue-500"
            >
              <MessageCircle className="h-4 w-4" />
              Chat
            </Link>
          ))}
        </div>
      )}

      {urls.twitter.length > 0 && (
        <div className="flex flex-col gap-2 text-sm text-blue-400">
          {urls.twitter.map((url) => (
            <Link
              key={url}
              href={url}
              target="_blank"
              className="flex items-center gap-1 transition-colors hover:text-blue-500"
            >
              <Twitter className="h-4 w-4" />
              <span className="capitalize">@{exchangeName}</span>
            </Link>
          ))}
        </div>
      )}

      {urls.blog.length > 0 && (
        <div className="flex flex-col gap-2 text-sm text-blue-400">
          {urls.blog.map((url) => (
            <Link
              key={url}
              href={url}
              target="_blank"
              className="flex items-center gap-1 transition-colors hover:text-blue-500"
            >
              <Rss className="h-4 w-4" />
              Blog
            </Link>
          ))}
        </div>
      )}

      {urls.actual.length > 0 && (
        <div className="flex flex-col gap-2 text-sm text-blue-400">
          {urls.actual.map((url) => (
            <Link
              key={url}
              href={url}
              target="_blank"
              className="flex items-center gap-1 transition-colors hover:text-blue-500"
            >
              <Rss className="h-4 w-4" />
              {url.slice(0, url.length - 1)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
