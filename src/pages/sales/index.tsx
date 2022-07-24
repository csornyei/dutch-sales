import type { NextPage } from "next";
import { Fragment } from "react";
import { createClient } from "redis";
import SalesList from "../../components/SalesList";
import { getJumboSales } from "../../utils/jumbo";
import { JumboSales } from "../../utils/types";

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
  const client = createClient({
    url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  });

  await client.connect();

  const pong = await client.ping();

  console.log(pong);
  return {
    props: { jumbo: jumboSales },
    revalidate: 24 * 60 * 60,
  };
}
