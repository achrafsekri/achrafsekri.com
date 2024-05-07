import { Head, Html, Main, NextScript } from "next/document";
import { Analytics } from "@vercel/analytics/react";

function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Analytics />
        <div id="skip-navigation" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
