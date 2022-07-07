/* eslint-disable tailwindcss/no-custom-classname */
import CommonMarkdown from "@/components/markdown/CommonMarkdown";
import { useMarkdownArea } from "@/components/markdown/useMarkdownArea";
import { useMutateContent } from "@/hooks/useMutateContent";
import { PrivateNoteDTO } from "@/interface/types";
import { Layout } from "@/layout/Layout";
import Error from "@/pages/_error.page";
import useStore from "@/redux/store";
import { supabase } from "@/util/supabase";
import {
  BookmarkIcon,
  ChatAlt2Icon,
  DocumentTextIcon,
  HeartIcon,
  PencilAltIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { PostgrestError } from "@supabase/supabase-js";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
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
      <div className="flex flex-col items-center justify-center p-4 font-sans text-black dark:text-white">
        <div className="mt-4 h-full w-full md:w-3/4 xl:w-1/2">
          <div className="mb-4 flex items-center justify-end">
            <button
              type="button"
              className="rounded-lg bg-purple-700 py-2 px-4 font-medium text-white shadow-md transition-colors hover:bg-purple-600"
            >
              編集
            </button>
          </div>
          <div className="mb-2 flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-blue-500" />
            <span className="pl-1 text-2xl font-bold">{note.title}</span>
          </div>
          <div className="rounded-md border bg-white dark:bg-darkCard">
            <div className="markdown-preview overflow-y-scroll py-4 px-4">
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
          <div className="mb-2 mt-8 flex items-center">
            <UserCircleIcon className="h-8 w-8 text-blue-500" />
            <span className="pl-1 text-2xl font-bold">ユーザ情報</span>
          </div>
          <div className="rounded-md border bg-white dark:bg-darkCard">
            <div className="ml-4 flex w-full items-center py-8">
              {note.users.avatar_url.length > 0 && (
                <Image
                  src={note?.users.avatar_url}
                  alt="アイコン"
                  width={84}
                  height={84}
                  className=" rounded-full bg-center"
                />
              )}
              <div className="ml-4 flex flex-col">
                <span className="pl-1 font-bold">{note?.users.email}</span>
                <span className="pl-1 font-bold">{note?.users.full_name}</span>
                <div className="mt-2 flex">
                  <HeartIcon className="mr-2 h-6 w-6 text-pink-600" />
                  <BookmarkIcon className="h-6 w-6 text-blue-500 " />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            {note.comments?.length > 0 && (
              <div className="m2-4 mt-8 flex items-center">
                <ChatAlt2Icon className="h-8 w-8 text-blue-500" />
                <span className="pl-1 text-2xl font-bold">コメント一覧</span>
              </div>
            )}
            <div className="rounded-md border">
              {note.comments?.map((comment) => {
                return (
                  <div
                    key={comment.created_at}
                    className="border-b bg-white  dark:bg-darkCard"
                  >
                    <div className="flex justify-between py-4 px-4">
                      <div className="flex items-center justify-center">
                        {note.users.avatar_url.length > 0 && (
                          <Image
                            src={note?.users.avatar_url}
                            alt="アイコン"
                            width={24}
                            height={24}
                            className=" rounded-full bg-center"
                          />
                        )}
                        <span className="pl-2 font-bold">{comment.title}</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">
                        {" "}
                        {`
                      @${note.users.full_name}が${format(
                          new Date(comment.created_at),
                          "yyyy年MM月dd (EEE)",
                          {
                            locale: ja,
                          },
                        )}にコメント
                      `}
                      </span>
                    </div>
                    <div className="overflow-y-scroll pl-12 pr-8 pb-4">
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
          <form>
            <div className="mb-2 mt-8 flex items-center">
              <PencilAltIcon className="h-8 w-8 text-blue-500" />
              <span className="pl-1 text-2xl font-bold">コメントする</span>
            </div>
            <div className="flex justify-center lg:h-[32rem] maxXl:flex-col">
              <div className="h-[18rem] w-full lg:h-full lg:w-1/2">
                <CommonMarkdown />
                <textarea
                  ref={markdownRef}
                  placeholder="Markdownで記述"
                  className="h-[90%] w-full resize-none border py-4 px-2 shadow-md  focus:outline-none dark:bg-darkGrey"
                  value={note.content}
                  onChange={(e) =>
                    create({ ...editNote, content: e.target.value })
                  }
                  onKeyPress={setEnterPress}
                ></textarea>
              </div>
              <div className=" markdown-preview h-[18rem] w-full overflow-y-scroll border bg-white py-4 px-2 shadow-md dark:bg-darkCard lg:h-full lg:w-1/2">
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
            <div className=" flex items-center justify-end">
              <button className="my-4 ml-2 rounded-lg bg-purple-700 py-2 px-4 font-medium text-white shadow-md transition-colors hover:bg-purple-600">
                コメント
              </button>
            </div>
          </form>
        </div>
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
