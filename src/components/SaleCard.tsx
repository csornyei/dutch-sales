import Image from "next/image";
import { JumboSaleItem } from "../utils/types";

interface SaleCardProps {
  item: JumboSaleItem;
}

export default function SaleCard({ item }: SaleCardProps) {
  const imgSrc = item.image.includes("https")
    ? item.image
    : `https://www.jumbo.com${item.image}`;

  const imgSize = 100;
  const classes = {
    card: "border rounded w-2/12 mb-4 mx-3 px-4 py-6 shadow-lg bg-yellow-200 flex flex-col",
    cardCompact:
      "border rounded w-11/12 mb-2 mx-auto px-1 py-2 shadow bg-yellow-200 flex flex-row",
    cardTitleContainer: "w-8/12 flex flex-col",
    cardTitle: "font-bold text-lg text-ellipsis overflow-hidden",
    cardSubtitle: "font-semibold text-md text-ellipsis overflow-hidden",
    cardTagContainer: "grow",
    cardTag: "font-light text-slate-700 text-ellipsis overflow-hidden",
    cardDates: "w-full flex flex-row justify-between self-end",
    cardDatesContainer: "text-right w-2/12 flex flex-col justify-end items-end",
  };
  return (
    <div className={classes.cardCompact}>
      <Image src={imgSrc} alt={item.title} width={imgSize} height={imgSize} />
      <div className={classes.cardTitleContainer}>
        <h2 className={classes.cardTitle}> {item.title} </h2>
        <h3 className={classes.cardSubtitle}> {item.subtitle} </h3>
        <span className={classes.cardTag}> {item.tag} </span>
      </div>
      <div className={classes.cardDatesContainer}>
        <span> from: {item.from} </span>
        <span> until: {item.until} </span>
      </div>
    </div>
  );
}
