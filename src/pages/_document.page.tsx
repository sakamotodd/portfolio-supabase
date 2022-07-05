import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();
export default class _Document extends Document {
  static getInitialProps = getInitialProps;
  render() {
    return (
      <Html lang="ja-JP">
        <Head>
          <meta name="application-name" content="MyApp" />
        </Head>
        <body className="light:text-black light:bg-slate-100 dark:bg-darkGrey dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
