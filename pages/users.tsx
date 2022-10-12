import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { trpc } from "../utils/trpc";

const Users: NextPage = () => {
  const { isLoading, data } = trpc.users.paginate.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <ul>
        {data?.users.map((user) => (
          <li>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
