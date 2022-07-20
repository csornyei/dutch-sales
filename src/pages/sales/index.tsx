import type { NextPage } from "next";
import { Fragment, useState } from "react";
import SaleCard from "../../components/SaleCard";
import { getJumboSales, getJumboSalesMock } from "../../utils/jumbo";
import { JumboSaleItem } from "../../utils/types";

interface HomePageProps {
  jumbo: JumboSaleItem[];
}

const Home: NextPage<HomePageProps> = ({ jumbo }) => {
  return (
    <Fragment>
      <main className="flex flex-col flex-wrap w-full mt-8">
        {jumbo.map((item, index) => (
          <SaleCard key={item.title + index} item={item} />
        ))}
      </main>
    </Fragment>
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
