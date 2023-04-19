import "@/styles/globals.css";
import type { AppProps } from "next/app";
import QueryProvider from "@/reactQuery/configs";
import { appWithTranslation } from "next-i18next";
function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <Component {...pageProps} />
    </QueryProvider>
  );
}
export default appWithTranslation(App);
