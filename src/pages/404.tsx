import Link from "next/link";

export default function Index() {
  return (
    <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-center">
      <h1 className="font-bold text-xl mb-4">Page not found!</h1>
      <h2 className="font-bold text-lg ">
        To use this app visit{" "}
        <Link href="/sales">
          <a className="underline text-blue-300">/sales</a>
        </Link>
      </h2>
    </div>
  );
}
