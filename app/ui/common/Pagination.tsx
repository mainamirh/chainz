import { ChevronLeft, ChevronRight } from "lucide-react";

import { range } from "@/app/lib/utils";

interface PaginationProps {
  items: any[];
  itemsPerPage: number;
  siblings?: 1 | 2;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  items,
  itemsPerPage,
  siblings = 1,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const renderButton = (number: number, key?: string) => (
    <button
      type="button"
      key={key ?? number}
      onClick={() => onPageChange(number)}
      className={`${currentPage === number ? "bg-border hover:bg-border" : "hover:bg-border/60"} inline-flex aspect-square w-7 items-center justify-center rounded-md border border-border shadow-sm transition-colors md:w-8`}
    >
      {number}
    </button>
  );

  const renderEllipsis = (key: string) => (
    <div
      key={key}
      className="inline-flex aspect-square w-7 items-center justify-center md:w-8"
    >
      ...
    </div>
  );

  const renderPageNumbers = () => {
    if (totalPages - siblings + 1 < 8) {
      return range(1, totalPages).map((number) => renderButton(number));
    }

    if (currentPage > 4 && currentPage <= totalPages - 4) {
      return (
        <>
          {renderButton(1)}
          {renderEllipsis("left-ellipsis")}
          {range(1, siblings)
            .reverse()
            .map((number) =>
              renderButton(currentPage - number, `previous-${number}`),
            )}
          {renderButton(currentPage, "current")}
          {range(1, siblings).map((number) =>
            renderButton(currentPage + number, `next-${number}`),
          )}
          {renderEllipsis("right-ellipsis")}
          {renderButton(totalPages)}
        </>
      );
    }

    if (currentPage <= 4) {
      return (
        <>
          {range(1, 5 + (2 * siblings - 2)).map((number) =>
            renderButton(number),
          )}
          {renderEllipsis("right-ellipsis")}
          {renderButton(totalPages)}
        </>
      );
    }

    if (currentPage > totalPages - 4) {
      return (
        <>
          {renderButton(1)}
          {renderEllipsis("left-ellipsis")}
          {range(totalPages - 4 - (2 * siblings - 2), totalPages).map(
            (number) => renderButton(number),
          )}
        </>
      );
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${currentPage === 1 && "opacity-0"} flex items-center pr-1 transition-opacity`}
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </button>
      {renderPageNumbers()}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${currentPage === totalPages && "opacity-0"} flex items-center pl-1 transition-opacity`}
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
