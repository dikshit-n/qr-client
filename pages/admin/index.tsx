import { AdminDashboard } from "@/content/admin";
import { Authenticated } from "@/guard";
import { AdminLayout } from "@/layouts";
import { NextPage } from "next";
import Head from "next/head";

const AdminHome: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <AdminDashboard />
    </>
  );
};

AdminHome.getLayout = (page) => (
  <Authenticated roles={["admin"]}>
    <AdminLayout>{page}</AdminLayout>
  </Authenticated>
);

export default AdminHome;
