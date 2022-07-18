import type { NextPage } from "next";
import SaleCard from "../components/SaleCard";
import { getJumboSales, getJumboSalesMock } from "../utils/jumbo";
import { JumboSaleItem } from "../utils/types";

interface HomePageProps {
  jumbo: JumboSaleItem[];
}

const Home: NextPage<HomePageProps> = ({ jumbo }) => {
  console.log(jumbo);
  return (
    <div>
      {jumbo.map((item) => (
        <SaleCard key={item.title} item={item} compact={false} />
      ))}
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  // const jumboSales = await getJumboSales();
  const jumboSales = await getJumboSalesMock();
  return {
    props: { jumbo: jumboSales },
    revalidate: 24 * 60 * 60,
  };
}
