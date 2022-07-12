import { useMutateComment } from "@/hooks/useMutateComment";
import useStore from "@/redux/store";
import { Alert, Modal } from "@mantine/core";
import React, { Dispatch, FC, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { AlertCircle } from "tabler-icons-react";
import CommonMarkdown from "../markdown/CommonMarkdown";
import { useMarkdownArea } from "../../hooks/useMarkdownArea";

type ModalDTO = {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
};

export const UpdateModal: FC<ModalDTO> = ({ opened, setOpened }) => {
  const { updateCommentMutation } = useMutateComment();
  const update = useStore((state) => state.setUpdateComment);
  const { markdownRef, setEnterPress, components } = useMarkdownArea();
  const { updateComment } = useStore();

  const updateCommentHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCommentMutation.mutate(updateComment);
  };

  const resetHandle = () => {
    setOpened(false);
  };
  return (
    <Modal
      opened={opened}
      centered
      onClose={() => setOpened(false)}
      title="この記事を更新しますか？"
      size="xl"
    >
      <Alert icon={<AlertCircle size={16} />} title="警告" color="red">
        <span>{`この記事を更新してもよろしいでしょうか？`}</span>
        <br />
        <span>この操作は取り消せません。</span>
      </Alert>
      <form onSubmit={updateCommentHandle} className="dark:text-white">
        <div className="flex justify-center lg:h-[32rem] maxXl:flex-col">
          <div className="flex h-[18rem] w-full flex-col lg:h-full lg:w-1/2">
            <CommonMarkdown />
            <input
              type="text"
              className="h-1/6 w-full border py-4 px-2 font-bold shadow-md focus:outline-none dark:bg-darkGrey"
              placeholder="タイトル"
              value={updateComment.title}
              onChange={(e) =>
                update({ ...updateComment, title: e.target.value })
              }
            />
            <textarea
              ref={markdownRef}
              placeholder="Markdown内容"
              className="h-5/6 w-full resize-none border py-4 px-2 shadow-md  focus:outline-none dark:bg-darkGrey dark:text-white"
              value={updateComment.content}
              onChange={(e) =>
                update({ ...updateComment, content: e.target.value })
              }
              onKeyPress={setEnterPress}
            ></textarea>
          </div>
          <div className="h-[18rem] w-full border bg-white py-4 px-2 shadow-md dark:bg-darkCard dark:text-white lg:h-full lg:w-1/2">
            <ReactMarkdown
              className="markdown"
              remarkPlugins={[
                [remarkGfm, { singleTilde: false }],
                [remarkBreaks],
              ]}
              components={components}
            >
              {updateComment.content}
            </ReactMarkdown>
          </div>
        </div>
        <div className="mt-4 flex justify-around">
          <button
            type="button"
            className="transition-c1olors ml-2 rounded-lg bg-slate-800 py-2 px-4 font-medium text-white shadow-md hover:bg-slate-700"
            onClick={resetHandle}
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="ml-2 rounded-lg bg-red-700 py-2 px-4 font-medium text-white shadow-md transition-colors hover:bg-red-500"
            onClick={resetHandle}
          >
            コメント更新
          </button>
        </div>
      </form>
    </Modal>
  );
};
