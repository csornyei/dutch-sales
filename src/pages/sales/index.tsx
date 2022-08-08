import type { NextPage } from "next";
import { Fragment } from "react";
import SalesList from "../../components/SalesList";
import { SaleItem, SaleItemList } from "../../utils/types";
import db from "../../utils/db";

interface HomePageProps {
  items: SaleItemList;
  error: string;
}

const Home: NextPage<HomePageProps> = ({ items, error }) => {
  console.log(items);
  return (
    <Fragment>
      <main className="flex flex-col flex-wrap w-full mt-8">
        {Object.entries(items).map(([key, sales]) => {
          return <SalesList key={`jumbo-${key}`} title={key} sales={sales} />;
        })}
      </main>
    </Fragment>
  );
};

export default Home;

export async function getStaticProps() {
  try {
    const results = (await db.getAll()) as SaleItem[];
    const items: SaleItemList = {};
    results.forEach((item) => {
      if (item.category in items) {
        items[item.category].push(item);
      } else {
        items[item.category] = [];
      }
    });
    console.log(results);
    return {
      props: { error: "", items },
    };
  } catch (e) {
    return {
      props: { error: "server error", jumbo: [] },
      revalidate: 10 * 60,
    };
  }
}
