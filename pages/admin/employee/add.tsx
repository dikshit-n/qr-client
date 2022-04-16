import { AddEmployeeContent } from "@/content/admin";
import { Authenticated } from "@/guard";
import { AdminLayout } from "@/layouts";
import { NextPage } from "next";
import Head from "next/head";

const AddEmployee: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Add Employee</title>
      </Head>
      <AddEmployeeContent />
    </>
  );
};

AddEmployee.getLayout = (page) => (
  <Authenticated roles={["admin"]}>
    <AdminLayout>{page}</AdminLayout>
  </Authenticated>
);

export default AddEmployee;
