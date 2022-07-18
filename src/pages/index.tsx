import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <h1 className="">Hello world!</h1>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  return {
    props: [],
    revalidate: 24 * 60 * 60,
  };
}
