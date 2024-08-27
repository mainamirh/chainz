"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { ChevronRight } from "lucide-react";

const Description = ({ description }: { description: string }) => {
  const [readMore, setReadMore] = useState(false);

  const isDescriptionLong = description.split(" ").length / 2 >= 100;

  return (
    <div className="relative z-10 w-full lg:w-4/5">
      <ReactMarkdown
        components={{
          a(props) {
            const { node, ...rest } = props;
            return <a {...rest} target="_blank" />;
          },
        }}
        className={`${isDescriptionLong && !readMore ? "h-[500px]" : "h-auto"} prose prose-sm prose-sky max-w-full overflow-hidden text-justify md:prose-base dark:prose-invert`}
      >
        {description}
      </ReactMarkdown>
      {!readMore ? (
        <div
          onClick={() => setReadMore(!readMore)}
          className={`${isDescriptionLong ? "flex" : "hidden"} absolute inset-x-0 -bottom-1 z-10 h-[140px] cursor-pointer items-end justify-center rounded-b-md bg-gradient-to-t from-foreground from-40% to-transparent text-base text-indigo-500 backdrop-brightness-110 transition-colors hover:text-indigo-600 active:text-indigo-700 dark:text-indigo-300 dark:backdrop-brightness-90 hover:dark:text-indigo-400 active:dark:text-indigo-500`}
        >
          <div className="mb-4 flex items-center">
            Read More
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            setTimeout(() => {
              setReadMore(!readMore);
            }, 500);
            window.scrollTo(0, 200);
          }}
          className={`${isDescriptionLong ? "flex" : "hidden"} mt-4 cursor-pointer items-center justify-center rounded-md bg-foreground p-4 text-base text-indigo-500 shadow transition-colors hover:text-indigo-600 active:text-indigo-700 dark:text-indigo-300 dark:backdrop-brightness-90 hover:dark:text-indigo-400 active:dark:text-indigo-500`}
        >
          <div className="flex items-center">
            Read Less
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Description;
