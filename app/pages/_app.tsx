import { Poppins } from "@next/font/google";

import type { AppProps } from "next/app";
import ItemsProvider from "../context/itemsContext";
import "../styles/globals.css";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${poppins.variable} font-sans`}>
      <ItemsProvider>
        <Component {...pageProps} />
      </ItemsProvider>
    </main>
  );
}
