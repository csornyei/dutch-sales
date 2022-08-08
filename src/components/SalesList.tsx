import React, { useState } from "react";
import { SaleItem } from "../utils/types";
import { ChevronDown, ChevronUp } from "./icons";
import SaleCard from "./SaleCard";

interface SalesListProps {
  title: string;
  sales: SaleItem[];
}

const SalesList: React.FC<SalesListProps> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="ml-2">
      <h2
        className="cursor-pointer text-lg font-bold mb-2 select-none"
        onClick={() => setOpen(!open)}
      >
        {props.title} {open ? <ChevronUp /> : <ChevronDown />}
      </h2>
      {open ? (
        <div className="ml-4">
          {props.sales.map((item, index) => (
            <SaleCard key={item.title + index} item={item} />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default SalesList;
