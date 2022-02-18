import { Loader } from "components/loader/loader";
import React from "react";
import "./button.scss";

type Props = {
  children?: React.ReactNode;
  onClick?: any;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "danger" | "success" | "link" | "icon-btn";
  type?: 'button' | 'submit' | 'reset';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
};

export const Button = React.memo(({
  children,
  className = '',
  variant = 'primary',
  onClick,
  type = 'button',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  loading = false,
  ...rest
}: Props) => (
  <button
    type={type}
    className={`button ${disabled ? 'disabled' : ''} ${type === 'submit' ? 'submit' : ''} ${loading ? 'loading' : ''} ${variant} ${className}`}
    disabled={disabled || loading}
    onClick={(e) => { e.stopPropagation(); onClick && onClick(e) }}
    {...rest}
  >
    <span className={`grid grid-flow-col gap-x-2 ${loading ? "opacity-0" : ""}`}>
      {iconLeft}
      {children}
      {iconRight}
    </span>
    <span className={`absolute ${loading ? "opacity-100" : "opacity-0"}`}>
      {loading && <Loader size={7} />}
    </span>
  </button>
));