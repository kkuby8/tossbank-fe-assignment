import { useEffect, useState } from "react";
import { css, Global } from "@emotion/react";
import { initMockAPI } from "mocks";
import { AppProps } from "next/app";

import { GlobalPortal } from "../src/components/GlobalPortal";

import "../src/sass/app.scss";
import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [isReadyToRender, setIsReadyToRender] = useState(false);

  useEffect(() => {
    initMockAPI().then(() => setIsReadyToRender(true));
  }, []);

  if (!isReadyToRender) {
    return null;
  }

  return (
    <GlobalPortal.Provider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <Global
        styles={css`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-size: 1em;
            font-weight: normal;
            margin: 0; /* or '0 0 1em' if you're so inclined */
          }
        `}
      />

      <Component {...pageProps} />
    </GlobalPortal.Provider>
  );
}
