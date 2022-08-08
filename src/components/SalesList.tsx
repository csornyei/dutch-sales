import React, { useRef, useState } from "react";
import { SaleItem } from "../utils/types";
import { ChevronDown, ChevronUp } from "./icons";
import SaleCard from "./SaleCard";

interface SalesListProps {
  title: string;
  sales: SaleItem[];
}

const SalesList: React.FC<SalesListProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const listTopRef = useRef<HTMLElement | null>(null);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      const { current } = listTopRef;
      const rect = current?.getBoundingClientRect();
      if (rect) {
        setShowButton(rect.top < 0 && open);
      }
    });
  }

  return (
    <section className="ml-2" ref={listTopRef}>
      <h2
        className="cursor-pointer text-lg font-bold mb-2 select-none"
        onClick={() => setOpen(!open)}
      >
        {props.title} {open ? <ChevronUp /> : <ChevronDown />}
      </h2>
      {open ? (
        <div className="ml-4 h-full flex flex-col">
          {props.sales.map((item, index) => (
            <SaleCard key={item.title + index} item={item} />
          ))}
        </div>
      ) : null}
      {showButton ? (
        <button
          className="bg-white rounded-full p-1 text-xs border border-slate-400 float-right w-12 sticky left-full bottom-12 z-50"
          onClick={() => {
            window.scrollTo({
              top: listTopRef.current?.offsetTop,
              behavior: "smooth",
            });
          }}
        >
          <ChevronUp />
        </button>
      ) : null}
    </section>
  );
};

export default SalesList;
