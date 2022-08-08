import { SaleItemList } from "../utils/types";
import SalesList from "./SalesList";

const SalesPage = ({ items }: { items: SaleItemList }) => {
  return (
    <main className="flex flex-col flex-wrap w-full mt-8">
      {Object.entries(items).map(([key, sales]) => {
        return <SalesList key={`jumbo-${key}`} title={key} sales={sales} />;
      })}
    </main>
  );
};

export default SalesPage;
