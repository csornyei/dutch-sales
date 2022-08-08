import { NextPage } from "next";
import { Fragment } from "react";
import ErrorPage from "../../components/errorPage";
import Navbar from "../../components/navbar";
import SalesList from "../../components/SalesList";
import SalesPage from "../../components/salesPage";
import db from "../../utils/db";
import { SaleItem, SaleItemList, SupportedSites } from "../../utils/types";

interface HomePageProps {
  items: SaleItemList;
  error: string;
}

const INVALID_SITE_NAME_ERROR = "Invalid site name";

const SitePage: NextPage<HomePageProps> = ({ items, error }) => {
  return (
    <Fragment>
      <Navbar />
      {error.length > 0 ? (
        <ErrorPage
          error={
            error === INVALID_SITE_NAME_ERROR ? INVALID_SITE_NAME_ERROR : ""
          }
        />
      ) : (
        <SalesPage items={items} />
      )}
    </Fragment>
  );
};

export default SitePage;

export async function getStaticPaths() {
  const supportedSites = Object.keys(SupportedSites);
  return {
    paths: supportedSites.map((key) => ({
      params: {
        site: key,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { site } = context.params;

  try {
    if (site && Object.keys(SupportedSites).includes(site)) {
      const results = (await db.getBySite(site)) as SaleItem[];
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
        props: {
          items,
          error: "",
        },
        revalidate: 10 * 60,
      };
    } else {
      return {
        props: {
          items: {},
          error: "Invalid site name!",
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        items: {},
        error: "server error",
      },
      revalidate: 10 * 60,
    };
  }
}
