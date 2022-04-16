import { AddPlaceContent } from "@/content/admin";
import { Authenticated } from "@/guard";
import { AdminLayout } from "@/layouts";
import { NextPage } from "next";
import Head from "next/head";

const AddPlace: NextPage = (props) => {
  return (
    <>
      <Head>Add Place</Head> <AddPlaceContent />
    </>
  );
};

AddPlace.getLayout = (page) => (
  <Authenticated roles={["admin"]}>
    <AdminLayout>{page}</AdminLayout>
  </Authenticated>
);

export default AddPlace;
