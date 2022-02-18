import { XIcon } from "@heroicons/react/solid";
import React from "react";
import { useState, useRef, useEffect } from "react";
import './chip.scss'


type ChipProps = {
  label: string,
  icon?: string,
  onClick?: (event: any) => void,
  onDelete?: (event: any) => void,
  className?: string,
}

export const Chip = React.memo(({
  label,
  icon,
  onClick,
  onDelete,
  className,
  ...props
}: ChipProps) => {
  const [isHover, setIsHover] = useState(false);
  const chipRef = useRef(null);

  useEffect(() => {
    const handleClick = (e: any) => {
      if ((chipRef?.current as any).contains(e.target)) {
        return;
      }
      onClick && onClick(e);
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [chipRef, onClick]);

  return (
    <div
      ref={chipRef}
      className={`rounded-md p-1 m-1 flex items-center justify-center ${isHover ? "bg-secondary" : "bg-primary"} ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...props}
    >
      {icon && <i className={`${icon} text-gray-600`}></i>}
      <span className="text-xs text-white pl-2 pr-2 font-bold truncate ...">{label}</span>
      {onDelete && (
        <XIcon
          className="h-4 w-4 mr-1 text-white hover:text-orange"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(e);
          }}
        />)}
    </div>
  );
});