import { useMutateComment } from "@/hooks/useMutateComment";
import { useMutateContent } from "@/hooks/useMutateContent";
import { Alert, Modal } from "@mantine/core";
import React, { Dispatch, FC, FormEvent } from "react";
import { AlertCircle } from "tabler-icons-react";

type ModalDTO = {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
  id: string;
  title: string;
  check: string;
};

export const DeleteModal: FC<ModalDTO> = ({
  opened,
  setOpened,
  id,
  title,
  check,
}) => {
  const { deleteNoteMutation } = useMutateContent();
  const { deleteCommentMutation } = useMutateComment();

  const deleteNoteHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (check === "notes") {
      deleteNoteMutation.mutate(id);
    } else {
      deleteCommentMutation.mutate(id);
    }
  };
  return (
    <Modal
      opened={opened}
      centered
      onClose={() => setOpened(false)}
      title="この記事を削除しますか？"
    >
      <Alert icon={<AlertCircle size={16} />} title="警告" color="red">
        <span>{`"${title}"を削除してもよろしいでしょうか？`}</span>
        <br />
        <span>この操作は取り消せません。</span>
      </Alert>
      <form className="mt-4 flex justify-around" onSubmit={deleteNoteHandle}>
        <button
          type="button"
          className="transition-c1olors ml-2 rounded-lg bg-slate-800 py-2 px-4 font-medium text-white shadow-md hover:bg-slate-700"
          onClick={() => setOpened(false)}
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="ml-2 rounded-lg bg-red-700 py-2 px-4 font-medium text-white shadow-md transition-colors hover:bg-red-600"
          onClick={() => setOpened(false)}
        >
          削除
        </button>
      </form>
    </Modal>
  );
};
