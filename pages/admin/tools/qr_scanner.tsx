import { QRScanner } from "@/content/admin";
import { Authenticated } from "@/guard";
import { AdminLayout } from "@/layouts";
import { NextPage } from "next";
import Head from "next/head";

const ViewPlaces: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Tools - QR Scanner</title>
      </Head>
      <QRScanner />
    </>
  );
};

ViewPlaces.getLayout = (page) => (
  <Authenticated roles={["admin"]}>
    <AdminLayout>{page}</AdminLayout>
  </Authenticated>
);

export default ViewPlaces;
