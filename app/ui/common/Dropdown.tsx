"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { coinLogo } from "@/app/lib/utils";
import Button from "./Button";

type Option = { id: number; name: string; symbol: string };

interface DropdownProps {
  options: Option[] | undefined;
  selected: Option | undefined;
  onChange: (value: Option) => void;
  placeHolder: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onChange,
  placeHolder,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElement = event.target as HTMLElement;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(dropdownElement)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative text-xs md:text-sm" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="custom"
        className="flex items-center gap-2 whitespace-nowrap bg-border disabled:pointer-events-none disabled:opacity-60"
        type="button"
        disabled={!options}
      >
        {selected ? (
          <span className="flex items-center gap-1.5">
            <span className="h-5 w-5">
              <Image
                src={coinLogo(selected.id)}
                alt="coin-logo"
                width={20}
                height={20}
                className="rounded-full"
              />
            </span>
            <span className="font-medium">{selected.symbol}</span>
          </span>
        ) : (
          <span>{placeHolder}</span>
        )}
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && options && (
        <div className="absolute -top-[100px] right-[70px] z-50 h-[300px] w-56 overflow-auto rounded-md bg-border p-1 shadow-lg">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="flex cursor-pointer items-center gap-2 rounded-md bg-border p-3 transition-all hover:brightness-125"
            >
              <Image
                src={coinLogo(option.id)}
                alt="coin-logo"
                width={24}
                height={24}
                className="rounded-full"
              />
              <div className="flex flex-col gap-0.5">
                <span>{option.name}</span>
                <span className="text-xs text-content/70">{option.symbol}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
