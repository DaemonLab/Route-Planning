import type { AppProps } from "next/app";
import ItemsProvider from "../context/itemsContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ItemsProvider>
        <Component {...pageProps} />
    </ItemsProvider>
  );
}
