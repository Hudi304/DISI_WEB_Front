import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useRef } from "react";
import { useEffect, useState } from "react";
import "./dropdown.scss";

type DropdownProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  origin?: {
    x: "left" | "right" | "center" | "";
    y: "top" | "bottom" | "center" | "";
  };
  childrenPositionRelative?:boolean ;
}

export const Dropdown = ({
  children,
  trigger,
  origin = { x: "", y: "" },
  childrenPositionRelative = false,
}: DropdownProps) => {

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      }
    }
  }, [open]);

  const handleClickOutside = (e: any) => {
    setOpen(false);
  };


  return (
    <Menu as="div" className="dropdown">
      {trigger}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items style={{position : childrenPositionRelative ? "relative" : "absolute" }} className={`menu-items`}
        //   style={{
        //   left: origin.x === "left" ? "-100%" : "auto",
        //   right: origin.x === "right" ? "100%" : "auto",
        //   top: origin.y === "top" ? "-100%" : "auto",
        //   bottom: origin.y === "bottom" ? "100%" : "auto",
        // }}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
