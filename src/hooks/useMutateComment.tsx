import { EditCommentsDTO, UpdateCommentsDTO } from "@/interface/types";
import useStore from "@/redux/store";
import { revalidatePrivate } from "@/util/revalidate";
import { supabase } from "@/util/supabase";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export const useMutateComment = () => {
  const resetInsertComment = useStore((state) => state.resetEditComment);

  /**
   * Insert comments by content/[id]
   */
  const createCommentMutaiton = useMutation(
    async (comments: EditCommentsDTO) => {
      const { data, error, status } = await supabase
        .from("comments")
        .insert(comments);
      if (error && status !== 406) {
        throw status;
      }
      return data;
    },
    {
      onSuccess: (res: any) => {
        revalidatePrivate(res[0].note_id);
        resetInsertComment;
        toast.success("コメントの書き込みに成功しました。");
      },
      onError: (error: any) => {
        toast.error("書き込みに失敗しました。再度やり直して下さい。");
        resetInsertComment;
      },
    },
  );

  /**
   *  Update comments by content/[id]
   */
  const updateCommentMutation = useMutation(
    async (comments: UpdateCommentsDTO) => {
      const { data, error, status } = await supabase
        .from("comments")
        .update({
          title: comments.title,
          content: comments.content,
        })
        .eq("id", comments.id);
      if (error && status !== 406) {
        throw status;
      }
      return data;
    },
    {
      onSuccess: (res: any) => {
        revalidatePrivate(res[0].note_id);
        resetInsertComment;
        toast.success("コメントの更新に成功しました。");
      },
      onError: (error: any) => {
        toast.error("コメントの更新にに失敗しました。再度やり直して下さい。");
        resetInsertComment;
      },
    },
  );

  /**
   * DELETE note by update/[id]
   */
  const deleteCommentMutation = useMutation(
    async (id: string) => {
      const { data, error, status } = await supabase
        .from("comments")
        .delete()
        .eq("id", id);
      if (error && status !== 406) {
        throw status;
      }
      return data;
    },
    {
      onSuccess: (res: any) => {
        revalidatePrivate(res[0].note_id);
        resetInsertComment;
        toast.success("コメントの削除に成功しました。");
      },
      onError: () => {
        toast.error("記事の削除に失敗しました。再度やり直して下さい。");
        resetInsertComment;
      },
    },
  );
  return {
    createCommentMutaiton,
    updateCommentMutation,
    deleteCommentMutation,
  };
};
