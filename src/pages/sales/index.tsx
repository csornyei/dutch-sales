import type { NextPage } from "next";
import { Fragment, useState } from "react";
import SaleCard from "../../components/SaleCard";
import SalesList from "../../components/SalesList";
import { getJumboSales, getJumboSalesMock } from "../../utils/jumbo";
import { JumboSaleItem, JumboSales } from "../../utils/types";

interface HomePageProps {
  jumbo: JumboSales;
}

const Home: NextPage<HomePageProps> = ({ jumbo }) => {
  return (
    <Fragment>
      <main className="flex flex-col flex-wrap w-full mt-8">
        {Object.entries(jumbo).map(([key, sales]) => {
          return <SalesList key={`jumbo-${key}`} title={key} sales={sales} />;
        })}
      </main>
    </Fragment>
  );
};

export default Home;

export async function getStaticProps() {
  const jumboSales = await getJumboSales();
  return {
    props: { jumbo: jumboSales },
    revalidate: 24 * 60 * 60,
  };
}
