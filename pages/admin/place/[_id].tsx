import { EditPlaceContent } from "@/content/admin";
import { Authenticated } from "@/guard";
import { AdminLayout } from "@/layouts";
import { NextPage } from "next";
import Head from "next/head";

const EditPlace: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Edit Place</title>
      </Head>
      <EditPlaceContent />
    </>
  );
};

EditPlace.getLayout = (page) => (
  <Authenticated roles={["admin"]}>
    <AdminLayout>{page}</AdminLayout>
  </Authenticated>
);

export default EditPlace;
