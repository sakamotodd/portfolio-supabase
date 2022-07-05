import EditMarkdown from "@/components/markdown/EditMarkdown";
import { Layout } from "@/layout/Layout";

export default function PostPage() {
  return (
    <Layout title="編集ページ">
      <div className="mt-8 font-hiragino xl:mx-32 2xl:mx-36">
        <EditMarkdown />
      </div>
    </Layout>
  );
}
