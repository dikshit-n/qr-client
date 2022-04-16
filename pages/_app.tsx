import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import { AuthProvider } from "@/provider";
import { Provider as StoreProvider } from "react-redux";
import { store } from "@/redux";
import { Public } from "@/guard";
import { ThemeProvider } from "@/theme";
import "@/assets/scss/global.scss";
import { createEventEmitters } from "@/utils";
// import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { CustomModal, FlashMessage } from "@/components";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  // emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => <Public>{page}</Public>);
  // const { isReady } = useRouter();

  // invoke all eventEmitter
  useEffect(() => createEventEmitters(), []);

  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <SnackbarProvider
          maxSnack={6}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <FlashMessage />
          <CustomModal />
          <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default MyApp;
