import { Guest } from "@/guard";
import { NextPage } from "next";
import { LoginContent } from "@/content/auth";
import Head from "next/head";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>QR</title>
      </Head>
      <LoginContent />
    </>
  );
};

Login.getLayout = (page) => <Guest>{page}</Guest>;

export default Login;
