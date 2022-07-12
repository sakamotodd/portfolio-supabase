/* eslint-disable tailwindcss/no-custom-classname */
import { useMutateContent } from "@/hooks/useMutateContent";
import { PrivateNoteDTO } from "@/interface/types";
import Error from "@/pages/_error.page";
import useStore from "@/redux/store";

import { FC, FormEvent, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { useMarkdownArea } from "../../hooks/useMarkdownArea";
import { DeleteModal } from "../modal/deleteModal";
import { Spinner } from "../Spinner";
import CommonMarkdown from "./CommonMarkdown";

type fetchNotes = {
  notes: Omit<PrivateNoteDTO, "comments">;
};

const UpdateMarkdown: FC<fetchNotes> = ({ notes }) => {
  const [opened, setOpened] = useState(false);
  const { markdownRef, setEnterPress, components } = useMarkdownArea();
  const update = useStore((state) => state.setUpdateNote);
  const { updateNoteMutation, deleteNoteMutation } = useMutateContent();
  const { updateNote } = useStore();

  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateNoteMutation.mutate({
      title: updateNote.title,
      content: updateNote.content,
      openFlag: updateNote.openFlag,
      id: notes.id,
    });
  };

  const deleteNoteHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteNoteMutation.mutate(notes.id);
  };

  useEffect(() => {
    update({
      title: notes.title,
      content: notes.content,
      openFlag: notes.openFlag,
      id: notes.id,
    });
  }, []);

  if (updateNoteMutation.isLoading || deleteNoteMutation.isLoading) {
    return <Spinner />;
  }

  if (updateNoteMutation.error || deleteNoteMutation.error) {
    const status = Number(updateNoteMutation.error);
    return <Error statusCode={status} />;
  }

  return (
    <>
      <DeleteModal
        opened={opened}
        setOpened={setOpened}
        title={notes.title}
        id={notes.id}
        check="notes"
      />
      <form className="max-w-[80rem]" onSubmit={submitHandle}>
        <div className="mt-4 flex items-center justify-end">
          <button
            type="button"
            className="ml-2 rounded-lg bg-red-700 py-2 px-4 font-medium text-white shadow-md transition-colors hover:bg-red-600"
            onClick={() => setOpened(true)}
          >
            削除
          </button>
          <button
            type="submit"
            className="ml-2 rounded-lg bg-purple-700 py-2 px-4 font-medium text-white shadow-md transition-colors hover:bg-purple-600"
            onClick={() => update({ ...updateNote, openFlag: false })}
          >
            ローカルに保存
          </button>
          <button
            type="submit"
            className="ml-2 rounded-lg bg-purple-700 py-2 px-4 font-medium text-white shadow-md transition-colors hover:bg-purple-600"
            onClick={() => update({ ...updateNote, openFlag: true })}
          >
            一覧ページに投稿
          </button>
        </div>
        <input
          type="text"
          placeholder="タイトル"
          value={updateNote.title}
          onChange={(e) => update({ ...updateNote, title: e.target.value })}
          className="mx-auto mb-5 block h-14 w-full bg-slate-100 text-2xl font-bold outline-none dark:bg-darkBody"
        />
        <div className="flex h-[35rem] max-w-[80rem] justify-center">
          <div className="w-1/2">
            <CommonMarkdown />
            <textarea
              ref={markdownRef}
              placeholder="Markdownで記述"
              className="h-[90%] w-full resize-none border bg-white py-4 px-2 shadow-md focus:outline-none dark:bg-darkGrey"
              value={updateNote.content}
              onChange={(e) =>
                update({ ...updateNote, content: e.target.value })
              }
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
                {updateNote.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateMarkdown;
