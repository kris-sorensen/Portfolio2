import React, { Suspense } from "react";
import UserTable from "./UserTable";
import Link from "next/link";
import Loader from "../components/Loader/Loader";
interface Props {
  searchParams: {
    sortOrder: string;
  };
}
const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <h1>Users</h1>
      <Link className="btn" href="/users/new">
        New User
      </Link>
      <Suspense fallback={<Loader />}>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default UsersPage;
