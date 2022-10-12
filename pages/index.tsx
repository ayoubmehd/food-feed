import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { isLoading, data } = trpc.hello.useQuery({
    text: "client",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div className={styles.container}>{data?.greeting}</div>;
};

export default Home;
