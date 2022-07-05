import { logout } from "@/util/logout";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
interface Props {
  statusCode: number;
}
const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 font-mono text-sm">
      <Head>
        <title>{`${statusCode}ページ`}</title>
      </Head>
      <div className="flex h-full w-1/2 flex-col items-center justify-center bg-white p-8">
        {`${statusCode} - エラーが発生しました。再度やり直して下さい。`}
      </div>
      <button
        className="mt-12 rounded-lg bg-purple-700 py-2 px-4 font-medium text-white shadow-md transition-colors hover:bg-purple-600"
        onClick={logout}
      >
        ログインページ
      </button>
    </div>
  );
};

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
  return { statusCode };
};

export default Error;
