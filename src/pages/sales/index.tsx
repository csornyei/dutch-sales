import type { NextPage } from "next";
import { Fragment, useState } from "react";
import SaleCard from "../../components/SaleCard";
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
          return (
            <div key={`jumbo-${key}`}>
              <h2 className="text-lg font-bold mb-2">{key}</h2>
              {sales.map((item, index) => (
                <SaleCard key={item.title + index} item={item} />
              ))}
            </div>
          );
        })}
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
