/* eslint-disable tailwindcss/no-custom-classname */
import { useMutateContent } from "@/hooks/useMutateContent";
import Error from "@/pages/_error.page";
import useStore from "@/redux/store";
import { supabase } from "@/util/supabase";
import { useRouter } from "next/router";

import { FC, FormEvent, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { Spinner } from "../Spinner";
import CommonMarkdown from "./CommonMarkdown";
import { useMarkdownArea } from "./useMarkdownArea";

const EditMarkdown: FC = () => {
  const { markdownRef, setEnterPress, components } = useMarkdownArea();
  const [moveFlag, setMoveFlag] = useState(false);
  const create = useStore((state) => state.setEditNote);
  const { createNoteMutation } = useMutateContent();
  const { editNote } = useStore();

  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNoteMutation.mutate({
      title: editNote.title,
      content: editNote.content,
      openFlag: editNote.openFlag,
      user_id: supabase.auth.user()?.id,
    });
  };

  const createButtonHandle = (flag: boolean) => {
    create({ ...editNote, openFlag: flag });
    setMoveFlag(true);
  };

  if (createNoteMutation.isLoading) {
    return <Spinner />;
  }

  if (createNoteMutation.error) {
    const status = Number(createNoteMutation.error);
    return <Error statusCode={status} />;
  }

  return (
    <>
      <form className="max-w-[80rem]" onSubmit={submitHandle}>
        <div className="mt-4 flex items-center justify-end">
          <button
            type="submit"
            className="ml-2 rounded-lg bg-purple-700 py-2 px-4 font-medium text-white shadow-md transition-colors hover:bg-purple-600"
            onClick={() => createButtonHandle(false)}
          >
            ローカルに保存
          </button>
          <button
            type="submit"
            className="ml-2 rounded-lg bg-purple-700 py-2 px-4 font-medium text-white shadow-md transition-colors hover:bg-purple-600"
            onClick={() => createButtonHandle(true)}
          >
            一覧ページに投稿
          </button>
        </div>
        <input
          type="text"
          placeholder="タイトル"
          value={editNote.title}
          onChange={(e) => create({ ...editNote, title: e.target.value })}
          className="mx-auto mb-5 block h-14 w-full bg-slate-100 text-2xl font-bold outline-none dark:bg-darkBody"
        />
        <div className="flex h-[35rem] max-w-[80rem] justify-center">
          <div className="w-1/2">
            <CommonMarkdown />
            <textarea
              ref={markdownRef}
              placeholder="Markdownで記述"
              className="h-[90%] w-full resize-none border bg-white py-4 px-2 shadow-md focus:outline-none dark:bg-darkGrey text-black dark:text-white"
              value={editNote.content}
              onChange={(e) => create({ ...editNote, content: e.target.value })}
              onKeyPress={setEnterPress}
            ></textarea>
          </div>
          <div className="w-1/2">
            <div className="h-full w-full border bg-white py-4 px-2 shadow-md dark:bg-darkCard">
              <ReactMarkdown
                className="markdown"
                remarkPlugins={[
                  [remarkGfm, { singleTilde: false }],
                  [remarkBreaks],
                ]}
                components={components}
              >
                {editNote.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditMarkdown;
