"use client";

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "custom";
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className,
  children,
  ...otherProps
}) => {
  return (
    <button
      className={`${className} ${
        variant === "default" &&
        "bg-gradient-to-r from-iris-darker to-iris-lighter text-[#FFFFFA]"
      } rounded-full px-4 py-2 font-medium transition ease-in-out hover:brightness-110 active:shadow-inner active:brightness-90`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
