import Link from "next/link";
import { useRouter } from "next/router";
import { SupportedSites } from "../utils/types";

type SiteList = { [key in SupportedSites]: { name: string; href: string } };

const Navbar = () => {
  const {
    query: { site },
  } = useRouter();

  const sites: SiteList = {
    albertHeijn: {
      name: "Albert Heijn",
      href: "/sales/albertHeijn",
    },
    aldi: {
      name: "Aldi",
      href: "/sales/aldi",
    },
    ekoplaza: {
      name: "Ekoplaza",
      href: "/sales/ekoplaza",
    },
    jumbo: {
      name: "Jumbo",
      href: "/sales/jumbo",
    },
  };
  return (
    <div className="flex flex-row px-4 bg-lime-500 justify-between">
      <div className="self-auto py-2 text-lg font-bold">
        <Link href="/sales">All Sales</Link>
      </div>
      <ul className="flex flex-row">
        {Object.entries(sites).map(([key, { href, name }]) => {
          return (
            <Link href={href} key={name}>
              <a
                className={`px-4 py-2 hover:bg-lime-600 hover:rounded ${
                  !!site && typeof site === "string" && site === key
                    ? "bg-lime-400"
                    : ""
                }`}
                key={name}
              >
                {name}
              </a>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
