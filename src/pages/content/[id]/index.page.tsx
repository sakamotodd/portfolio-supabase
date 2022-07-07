/* eslint-disable tailwindcss/no-custom-classname */
import CommonMarkdown from "@/components/markdown/CommonMarkdown";
import { useMarkdownArea } from "@/components/markdown/useMarkdownArea";
import { Spinner } from "@/components/Spinner";
import { useMutateContent } from "@/hooks/useMutateContent";
import { CommentsDTO, PrivateNoteDTO } from "@/interface/types";
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
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
  PreviewData,
} from "next";
import Image from "next/image";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

type fetchNotes = {
  note: PrivateNoteDTO;
  error: PostgrestError | null;
  status: number;
};

type fetchComment = {
  comments: CommentsDTO[];
  error: PostgrestError | null;
  status: number;
};

type StaticProps = {
  notes: fetchNotes;
  comments: fetchComment;
};

const PrivateContentPage: NextPage<StaticProps> = ({ notes, comments }) => {
  const note = notes.note;
  const commentInfo = comments.comments;
  console.log("🚀 ~ file: index.page.tsx ~ line 56 ~ comment", commentInfo);
  console.log("🚀 ~ file: index.page.tsx ~ line 35 ~ note", note);
  const { markdownRef, setEnterPress, components } = useMarkdownArea();
  const createComment = useStore((state) => state.setEditComment);
  const { createCommentMutaiton } = useMutateContent();
  const { editComment } = useStore();

  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCommentMutaiton.mutate({
      title: editComment.title,
      content: editComment.content,
      note_id: note.id,
      user_id: supabase.auth.user()?.id,
    });
  };
  if (notes.error && notes.status !== 406) {
    return <Error statusCode={notes.status} />;
  }

  if (createCommentMutaiton.isError) {
    const status = Number(createCommentMutaiton.error);
    return <Error statusCode={status} />;
  }

  if (createCommentMutaiton.isLoading) {
    return <Spinner />;
  }

  return (
    <Layout title="個別ページ">
      <div className="flex flex-col items-center justify-center font-sans text-black dark:text-white">
        <div className="mt-4 h-full w-full md:w-3/4 xl:w-1/2">
          <div className="mb-4 flex items-center justify-end">
            <Link href={`/content/${note.id}/update`} prefetch={false}>
              <button
                type="button"
                className="rounded-lg bg-purple-700 py-2 px-4 font-medium text-white shadow-md transition-colors hover:bg-purple-600"
              >
                編集
              </button>
            </Link>
          </div>
          <div className="mb-2 flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-blue-500" />
            <span className="pl-1 text-2xl font-bold">{note.title}</span>
          </div>
          <div className="rounded-md border bg-white px-4 py-4 dark:bg-darkCard">
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
              <div className="mb-2 mt-8 flex items-center">
                <ChatAlt2Icon className="h-8 w-8 text-blue-500" />
                <span className="pl-1 text-2xl font-bold">コメント一覧</span>
              </div>
            )}
            <div
              className={`${note.comments?.length > 0 && "rounded-md border"}`}
            >
              {commentInfo?.map((comment) => {
                return (
                  <div
                    key={comment.created_at}
                    className="border-b bg-white  dark:bg-darkCard"
                  >
                    <div className="flex justify-between py-4 px-4">
                      <div className="flex items-center justify-center">
                        {comment.users.avatar_url.length > 0 && (
                          <Image
                            src={comment?.users.avatar_url}
                            alt="アイコン"
                            width={36}
                            height={36}
                            className=" rounded-full bg-center"
                          />
                        )}
                        <div className="flex flex-col pl-2">
                          <p className="text-xs text-gray-500">
                            @{comment.users.full_name}
                          </p>
                          <p className="font-bold">{comment.title}</p>
                        </div>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">
                        {" "}
                        {`
                      ${format(
                        new Date(comment.created_at),
                        "yyyy年MM月dd (EEE)",
                        {
                          locale: ja,
                        },
                      )}にコメント
                      `}
                      </span>
                    </div>
                    <div className="pl-16 pr-8 pb-4 text-sm">
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
          <form onSubmit={submitHandle}>
            <div className="mb-2 mt-8 flex items-center">
              <PencilAltIcon className="h-8 w-8 text-blue-500" />
              <span className="pl-1 text-2xl font-bold">コメントする</span>
            </div>
            <div className="flex justify-center lg:h-[32rem] maxXl:flex-col">
              <div className="flex h-[18rem] w-full flex-col lg:h-full lg:w-1/2">
                <CommonMarkdown />
                <input
                  type="text"
                  className="h-1/6 w-full border py-4 px-2 shadow-md focus:outline-none dark:bg-darkGrey"
                  placeholder="タイトル"
                  value={editComment.title}
                  onChange={(e) =>
                    createComment({ ...editComment, title: e.target.value })
                  }
                />
                <textarea
                  ref={markdownRef}
                  placeholder="Markdown内容"
                  className="h-5/6 w-full resize-none border py-4 px-2 shadow-md  focus:outline-none dark:bg-darkGrey"
                  value={editComment.content}
                  onChange={(e) =>
                    createComment({ ...editComment, content: e.target.value })
                  }
                  onKeyPress={setEnterPress}
                ></textarea>
              </div>
              <div className="h-[18rem] w-full border bg-white py-4 px-2 shadow-md dark:bg-darkCard lg:h-full lg:w-1/2">
                <ReactMarkdown
                  className="markdown"
                  remarkPlugins={[
                    [remarkGfm, { singleTilde: false }],
                    [remarkBreaks],
                  ]}
                  components={components}
                >
                  {editComment.content}
                </ReactMarkdown>
              </div>
            </div>
            <div className=" flex items-center justify-end">
              <button
                className="my-4 ml-2 rounded-lg bg-purple-700 py-2 px-4 font-medium text-white shadow-md transition-colors hover:bg-purple-600"
                type="submit"
              >
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

// 記事内容
const getPrivateNote = async (
  ctx: GetStaticPropsContext<ParsedUrlQuery, PreviewData>,
) => {
  const {
    data: note,
    error,
    status,
  } = await supabase
    .from("notes")
    .select("*, comments(*), users(*)")
    .eq("id", ctx.params?.id)
    .single();
  return { note, error, status };
};

const getCommentList = async (
  ctx: GetStaticPropsContext<ParsedUrlQuery, PreviewData>,
) => {
  const {
    data: comments,
    status,
    error,
  } = await supabase
    .from("comments")
    .select("*, users(*)")
    .eq("note_id", ctx.params?.id);
  return { comments, status, error };
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
  const notes = await getPrivateNote(ctx);
  const comments = await getCommentList(ctx);
  return {
    props: {
      notes,
      comments,
    },
    revalidate: false,
  };
};
