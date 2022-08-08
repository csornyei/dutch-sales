import type { NextPage } from "next";
import { Fragment } from "react";
import SalesList from "../../components/SalesList";
import { SaleItem, SaleItemList } from "../../utils/types";
import db from "../../utils/db";
import ErrorPage from "../../components/errorPage";
import SalesPage from "../../components/salesPage";
import Navbar from "../../components/navbar";

interface HomePageProps {
  items: SaleItemList;
  error: string;
}

const Home: NextPage<HomePageProps> = ({ items, error }) => {
  return (
    <Fragment>
      <Navbar />
      {error.length > 0 ? <ErrorPage /> : <SalesPage items={items} />}
    </Fragment>
  );
};

export default Home;

export async function getStaticProps() {
  try {
    const results = (await db.getAll()) as SaleItem[];
    const items: SaleItemList = {};
    results
      .filter((item) => {
        return (
          Object.keys(item).includes("category") &&
          typeof item.category !== "undefined"
        );
      })
      .forEach((item) => {
        if (item.category in items) {
          items[item.category].push(item);
        } else {
          items[item.category] = [];
        }
      });
    return {
      props: { error: "", items },
    };
  } catch (e) {
    return {
      props: { error: "server error", items: {} },
      revalidate: 10 * 60,
    };
  }
}
