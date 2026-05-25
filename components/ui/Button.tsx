"use client";

import React from "react";

type Variant = "primary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-gold text-brand-bg font-semibold hover:bg-brand-gold-hover shadow-gold hover:shadow-gold-lg",
  outline:
    "border border-brand-gold text-brand-gold bg-transparent hover:bg-brand-gold hover:text-brand-bg",
  ghost:
    "text-brand-text-secondary hover:text-brand-gold bg-transparent hover:bg-brand-card",
  danger:
    "bg-brand-red text-brand-text-primary font-semibold hover:bg-brand-red-light",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs rounded",
  md: "px-5 py-2.5 text-sm rounded-md",
  lg: "px-8 py-3.5 text-base rounded-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2",
        "transition-all duration-300 cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-brand-gold/50",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
