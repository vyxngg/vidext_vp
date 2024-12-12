import clsx from "clsx";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "primary" }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-4 py-2 rounded-md font-semibold focus:outline-none",
        variant === "primary" ? "bg-green-400 text-gray" : "bg-gray-600 text-gray"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
