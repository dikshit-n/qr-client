import { ViewEmployeesContent } from "@/content/admin";
import { Authenticated } from "@/guard";
import { AdminLayout } from "@/layouts";
import { NextPage } from "next";
import Head from "next/head";

const ViewEmployees: NextPage = (props) => {
  return (
    <>
      <Head>View Employees</Head> <ViewEmployeesContent />
    </>
  );
};

ViewEmployees.getLayout = (page) => (
  <Authenticated roles={["admin"]}>
    <AdminLayout>{page}</AdminLayout>
  </Authenticated>
);

export default ViewEmployees;
