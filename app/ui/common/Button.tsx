"use client";

import React, { ButtonHTMLAttributes } from "react";

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className = "",
  children,
  ...otherProps
}) => {
  return (
    <button
      className={`${className}
          bg-gradient-to-r from-iris-darker to-iris-lighter px-4 py-2 font-medium text-[#FFFFFA] rounded-lg hover:brightness-110 active:brightness-90 active:shadow-inner transition ease-in-out`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
