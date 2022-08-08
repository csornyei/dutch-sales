import { ReactNode } from "react";

const ErrorPage = ({
  error,
  children,
}: {
  error?: string;
  children?: ReactNode;
}) => (
  <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-center">
    <h1 className="font-bold text-xl mb-4">
      {!!error || error === ""
        ? error
        : "There was some error while loading the page!"}
    </h1>
    {children}
  </div>
);

export default ErrorPage;
