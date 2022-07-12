import { CommentsDTO } from "@/interface/types";
import useStore from "@/redux/store";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import { Dispatch, FC, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { useMarkdownArea } from "../../hooks/useMarkdownArea";
import { DeleteModal } from "../modal/deleteModal";

type PrivateCommentDTO = {
  comment: CommentsDTO;
  userId: string | undefined;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
};

const PrivateComment: FC<PrivateCommentDTO> = ({
  comment,
  userId,
  setOpened,
}) => {
  const { components } = useMarkdownArea();
  const [deleteOpened, setDeleteOpened] = useState(false);
  const update = useStore((state) => state.setUpdateComment);

  const updateModalHandle = (
    comment_id: string,
    comment_title: string,
    comment_content: string,
  ) => {
    setOpened(true);
    update({
      id: comment_id,
      title: comment_title,
      content: comment_content,
    });
  };
  return (
    <li
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
            <p className="text-xs text-gray-500">@{comment.users.full_name}</p>
            <p className="font-bold">{comment.title}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <DeleteModal
            opened={deleteOpened}
            setOpened={setDeleteOpened}
            title={comment.title}
            id={comment.id}
            check="commment"
          />
          {userId === comment.user_id && (
            <div className="flex">
              <button onClick={() => setDeleteOpened(true)}>
                <label>
                  <TrashIcon className="mr-2 h-4 w-4 cursor-pointer text-red-500" />
                </label>
              </button>
              <button
                onClick={() =>
                  updateModalHandle(comment.id, comment.title, comment.content)
                }
              >
                <label>
                  <PencilAltIcon className="h-4 w-4 cursor-pointer text-blue-500" />
                </label>
              </button>
            </div>
          )}
          <span className="text-gray-500 dark:text-gray-400">
            {" "}
            {`
              ${format(new Date(comment.created_at), "yyyy年MM月dd (EEE)", {
                locale: ja,
              })}にコメント
                `}
          </span>
        </div>
      </div>
      <div className="pl-16 pr-8 pb-4 text-sm">
        <ReactMarkdown
          className="markdown"
          remarkPlugins={[[remarkGfm, { singleTilde: false }], [remarkBreaks]]}
          components={components}
        >
          {comment.content}
        </ReactMarkdown>
      </div>
    </li>
  );
};

export default PrivateComment;
