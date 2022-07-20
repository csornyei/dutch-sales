import Image from "next/image";
import Link from "next/link";
import { JumboSaleItem } from "../utils/types";

interface SaleCardProps {
  item: JumboSaleItem;
}

export default function SaleCard({ item }: SaleCardProps) {
  const imgSize = 100;
  return (
    <div className="border rounded w-full mb-2 px-1 py-2 shadow bg-yellow-200 flex flex-row">
      <Image
        src={item.image}
        alt={item.title}
        width={imgSize}
        height={imgSize}
      />
      <div className="w-8/12 flex flex-col">
        <Link target="_blank" rel="noopener noreferrer" href={item.link}>
          <h2 className="font-bold text-lg text-ellipsis overflow-hidden underline cursor-pointer">
            {item.title}
          </h2>
        </Link>
        <h3 className="font-semibold text-md text-ellipsis overflow-hidden">
          {item.subtitle}
        </h3>
        <span className="font-light text-slate-700 text-ellipsis overflow-hidden">
          {item.tag}
        </span>
      </div>
      <div className="text-right w-2/12 flex flex-col justify-end items-end">
        <span> from: {item.from} </span>
        <span> until: {item.until} </span>
      </div>
    </div>
  );
}
