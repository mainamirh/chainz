"use client";

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...otherProps
}) => {
  return (
    <button
      className={`${className} ${
        variant === "primary"
          ? "bg-gradient-to-r from-iris-darker to-iris-lighter text-[#FFFFFA]"
          : "bg-white dark:border-none border border-iris-darker text-iris-darker"
      }
           px-4 py-2 font-medium rounded-full hover:brightness-110 active:brightness-90 active:shadow-inner transition ease-in-out`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
