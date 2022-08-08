import Link from "next/link";
import ErrorPage from "../components/errorPage";

export default function Index() {
  return (
    <ErrorPage error="Page not found!">
      <h2 className="font-bold text-lg ">
        To use this app visit{" "}
        <Link href="/sales">
          <a className="underline text-blue-300">/sales</a>
        </Link>
      </h2>
    </ErrorPage>
  );
}
