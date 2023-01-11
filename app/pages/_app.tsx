import { Poppins } from "@next/font/google";

import type { AppProps } from "next/app";
import Head from "next/head";
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
      <Head>
        <title>Route Planning for Optimized On-Time Delivery</title>
        <meta name="application-name" content="Route Planning" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Route Planning" />
        <meta
          name="description"
          content="This app is used to achieve Efficient On-Time Delivery and serve as a platform for warehouse managers and delivery personnels."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta
          name="msapplication-TileImage"
          content="/icons/ms-icon-144x144.png"
        />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        {/* <meta name="robots" content="index,follow" /> */}
        <link rel="canonical" href="https://route-planning.onrender.com/" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/icons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/icons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:url"
          content="https://route-planning.onrender.com"
        />
        <meta name="twitter:title" content="Route Planning" />
        <meta
          name="twitter:description"
          content="This app is used to achieve Efficient On-Time Delivery and serve as a platform for warehouse managers and delivery personnels."
        />
        <meta
          name="twitter:image"
          content="https://route-planning.onrender.com/icons/android-icon-192x192.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Route Planning" />
        <meta
          property="og:description"
          content="This app is used to achieve Efficient On-Time Delivery and serve as a platform for warehouse managers and delivery personnels."
        />
        <meta property="og:site_name" content="Route Planning" />
        <meta property="og:url" content="https://route-planning.onrender.com" />
        <meta
          property="og:image"
          content="https://route-planning.onrender.com/icons/apple-icon.png"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <ItemsProvider>
        <Component {...pageProps} />
      </ItemsProvider>
    </main>
  );
}
