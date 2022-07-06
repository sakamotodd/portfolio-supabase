/* eslint-disable tailwindcss/no-custom-classname */
import CommonMarkdown from "@/components/markdown/CommonMarkdown";
import { useMarkdownArea } from "@/components/markdown/useMarkdownArea";
import { useMutateContent } from "@/hooks/useMutateContent";
import { PrivateNoteDTO } from "@/interface/types";
import { Layout } from "@/layout/Layout";
import Error from "@/pages/_error.page";
import useStore from "@/redux/store";
import { supabase } from "@/util/supabase";
import { DocumentTextIcon } from "@heroicons/react/solid";
import { PostgrestError } from "@supabase/supabase-js";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

type StaticProps = {
  note: PrivateNoteDTO;
  error: PostgrestError | null;
  status: number;
};
const PrivateContentPage: NextPage<StaticProps> = ({ note, error, status }) => {
  console.log("🚀 ~ file: index.page.tsx ~ line 13 ~ note", note);
  const { markdownRef, setEnterPress, components } = useMarkdownArea();
  const create = useStore((state) => state.setEditNote);
  const { createNoteMutation } = useMutateContent();
  const { editNote } = useStore();
  const router = useRouter();

  if (error && status !== 406) {
    return <Error statusCode={status} />;
  }

  return (
    <Layout title="個別ページ">
      <div className="flex flex-col items-center justify-center p-4 font-hiragino dark:text-white">
        <div className="mt-4 h-full w-2/3">
          <div className="mb-4 flex items-center justify-end">
            <button
              type="button"
              className="rounded-lg bg-purple-700 py-2 px-4 font-medium text-white shadow-md transition-colors hover:bg-purple-600"
            >
              編集
            </button>
          </div>
          <div
            key={note.id}
            className="rounded-md border bg-white dark:bg-darkCard"
          >
            <div className="w-full py-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentTextIcon className="h-8 w-8 dark:text-gray-300" />
                  <label>
                    <span className="pl-1 text-3xl font-bold">
                      {note.title}
                    </span>
                  </label>
                </div>
              </div>
              <div className="mt-4 flex justify-items-start">
                {note.users.avatar_url?.length > 0 && (
                  <Image
                    src={note?.users.avatar_url}
                    alt="ログイン画像"
                    width={24}
                    height={24}
                    className="rounded-full bg-center"
                  />
                )}
                <span className="ml-4">{note.users.full_name}</span>
              </div>
            </div>
            <div className="markdown-preview overflow-y-scroll py-4 px-2">
              <ReactMarkdown
                className="markdown"
                remarkPlugins={[
                  [remarkGfm, { singleTilde: false }],
                  [remarkBreaks],
                ]}
                components={components}
              >
                {note.content}
              </ReactMarkdown>
            </div>
          </div>
          <div className="mt-8">
            {note.comments?.length > 0 && (
              <h1 className="text-2xl font-bold">コメント一覧</h1>
            )}
            <div>
              {note.comments?.map((comment) => {
                return (
                  <div
                    key={comment.created_at}
                    className="mt-4 rounded-md border"
                  >
                    <div className="flex py-4 ">
                      {note.users.avatar_url.length > 0 && (
                        <Image
                          src={note?.users.avatar_url}
                          alt="アイコン"
                          width={24}
                          height={24}
                          className=" rounded-full bg-center"
                        />
                      )}
                      <span className="pl-2">{comment.title}</span>
                    </div>
                    <div className="overflow-y-scroll py-4 px-2">
                      <ReactMarkdown
                        className="markdown"
                        remarkPlugins={[
                          [remarkGfm, { singleTilde: false }],
                          [remarkBreaks],
                        ]}
                        components={components}
                      >
                        {comment.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <h1 className="mt-8 text-xl font-bold">コメントする</h1>
        <form>
          <div className="flex h-[35rem] max-w-[80rem] justify-center">
            <div className="w-1/2">
              <CommonMarkdown />
              <textarea
                ref={markdownRef}
                placeholder="Markdownで記述"
                className="h-[90%] w-full resize-none border bg-white py-4 px-2 shadow-md focus:outline-none dark:text-black"
                value={note.content}
                onChange={(e) =>
                  create({ ...editNote, content: e.target.value })
                }
                onKeyPress={setEnterPress}
              ></textarea>
            </div>
            <div className=" w-1/2">
              <div className="markdown-preview h-full w-full overflow-y-scroll border bg-white py-4 px-2 shadow-md dark:bg-darkCard">
                <ReactMarkdown
                  className="markdown"
                  remarkPlugins={[
                    [remarkGfm, { singleTilde: false }],
                    [remarkBreaks],
                  ]}
                  components={components}
                >
                  {note.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
          <button className="mt-4 ml-2 rounded-lg bg-purple-700 py-2 px-4 font-medium text-white shadow-md transition-colors hover:bg-purple-600">
            コメントする
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PrivateContentPage;

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
  console.log(`ISR invoked - detail page user_is = ${ctx}`);
  const {
    data: note,
    error,
    status,
  } = await supabase
    .from("notes")
    .select("*, comments(*), users(*)")
    .eq("id", ctx.params?.id)
    .single();
  return {
    props: {
      note,
      error,
      status,
    },
    revalidate: false,
  };
};
