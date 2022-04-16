import { EditEmployeeContent } from "@/content/admin";
import { Authenticated } from "@/guard";
import { AdminLayout } from "@/layouts";
import { NextPage } from "next";
import Head from "next/head";

const EditEmployee: NextPage = (props) => {
  return (
    <>
      <Head>Edit Employee</Head> <EditEmployeeContent />
    </>
  );
};

EditEmployee.getLayout = (page) => (
  <Authenticated roles={["admin"]}>
    <AdminLayout>{page}</AdminLayout>
  </Authenticated>
);

export default EditEmployee;
