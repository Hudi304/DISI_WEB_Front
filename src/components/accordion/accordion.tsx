import "./accordion.scss";
import { Transition } from "@headlessui/react";
import { Icon, ICONS } from "components/icon/icon";
import { FC, Fragment } from "react";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  isOpen: (e: any) => void;

  dotClasses?: string;

  containerClassName?: string;
  titleClassName?: string;
  titleOpenedClassName?: string;
  bodyClassName?: string;

  transition?: {
    enter: string;
    enterFrom: string;
    enterTo: string;

    leave: string;
    leaveFrom: string;
    leaveTo: string;
  };
};

export const Accordion: FC<AccordionProps> = ({
  title,
  children,
  open = false,
  isOpen,
  containerClassName,
  titleClassName,
  titleOpenedClassName,
  bodyClassName,
  dotClasses,
  transition,
}: AccordionProps) => {
  // const [isOpen, setOpen] = useState(open);

  return (
    <div className={`accordion ${containerClassName}`}>
      <button className={`accordion-title ${titleClassName} ${open ? titleOpenedClassName : null}`} onClick={() => isOpen(title)}>
        <div className="title">{title}</div>

        {dotClasses && (
          <div className="flex items-center justify-center h-full w-full">
            <div className={`dot ${dotClasses}`} />
          </div>
        )}

        <div className="chevron-container">
          <Icon className="chevron" icon={open ? ICONS.CHEVRON_UP : ICONS.CHEVRON_DOWN} />
        </div>
      </button>

      <Transition
        as={Fragment}
        enter={transition?.enter}
        enterFrom={transition?.enterFrom}
        enterTo={transition?.enterTo}
        leave={transition?.leave}
        leaveFrom={transition?.leaveFrom}
        leaveTo={transition?.leaveTo}
        show={open}
      >
        <div className={`accordion-body ${bodyClassName}`}>{children}</div>
      </Transition>
    </div>
  );
};
