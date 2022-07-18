import { JumboSaleItem } from "../utils/types";

interface SaleCardProps {
  item: JumboSaleItem;
  compact: boolean;
}

export default function SaleCard({ item, compact = false }: SaleCardProps) {
  return <div></div>;
}
