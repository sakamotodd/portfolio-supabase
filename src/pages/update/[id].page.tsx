import UpdateMarkdown from "@/components/markdown/UpdateMarkdown";
import { PrivateNoteDTO } from "@/interface/types";
import { Layout } from "@/layout/Layout";
import { supabase } from "@/util/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Error from "../_error.page";

type StaticProps = {
  notes: Omit<PrivateNoteDTO, "comments">;
  error: PostgrestError | null;
  status: number;
};
const UpdatePage: NextPage<StaticProps> = ({ notes, error, status }) => {
  console.log("🚀 ~ file: [id].page.tsx ~ line 22 ~ status", status);
  console.log("🚀 ~ file: [id].page.tsx ~ line 22 ~ error", error);
  console.log("🚀 ~ file: [id].page.tsx ~ line 22 ~ notes", notes);
  if (error && status !== 406) {
    return <Error statusCode={status} />;
  }

  if (supabase.auth.user()?.id !== notes.user_id) {
    return <Error statusCode={404} />;
  }
  return (
    <Layout title="編集ページ">
      <div className="mt-8 font-hiragino text-black dark:text-white xl:mx-32 2xl:mx-36">
        <UpdateMarkdown notes={notes} />
      </div>
    </Layout>
  );
};

export default UpdatePage;

// fetch用関数
const getAllNoteIds = async () => {
  const { data: ids } = await supabase.from("notes").select("id");
  return ids!.map((id) => {
    return {
      params: {
        id: String(id.id),
      },
    };
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllNoteIds();
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log(`ISR invoked - detail page update = ${ctx}`);
  const {
    data: notes,
    error,
    status,
  } = await supabase
    .from("notes")
    .select("*, users(*)")
    .eq("id", ctx.params?.id)
    .single();

  return {
    props: {
      notes,
      error,
      status,
    },
    revalidate: false,
  };
};
