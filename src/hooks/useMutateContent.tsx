import { EditCommentsDTO, EditNoteDTO } from "@/interface/types";
import useStore from "@/redux/store";
import { revalidateList, revalidatePrivate } from "@/util/revalidate";
import { supabase } from "@/util/supabase";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export const useMutateContent = () => {
  const resetNote = useStore((state) => state.resetEditNote);
  const resetComment = useStore((state) => state.resetEditComment);

  /**
   * INSERT (notes) As create news by contentPage
   */
  const createNoteMutation = useMutation(
    async (note: EditNoteDTO) => {
      const { data, error, status } = await supabase.from("notes").insert(note);
      if (error && status !== 406) {
        throw status;
      }
      return data;
    },
    {
      onSuccess: () => {
        revalidateList();
        resetNote();
        toast.success("書き込みに成功しました。");
      },
      onError: () => {
        toast.error("書き込みに失敗しました。再度やりなおして下さい。");
        resetNote();
      },
    },
  );

  /**
   * Insert comments As create comment by content/[id]Page
   */
  const createCommentMutaiton = useMutation(
    async (comments: EditCommentsDTO) => {
      const { data, error, status } = await supabase
        .from("comments")
        .insert(comments);
      if (error && status != 406) {
        throw status;
      }
      return data;
    },
    {
      onSuccess: (res: any) => {
      console.log("🚀 ~ file: useMutateContent.tsx ~ line 51 ~ useMutateContent ~ res", res)
        revalidatePrivate(res[0].note_id);
        resetComment();
        toast.success("コメントの書き込みに成功しました。");
      },
      onError: (error: any) => {
        toast.error("書き込みに失敗しました。再度やり直して下さい。");
        resetComment();
      },
    },
  );
  return { createNoteMutation, createCommentMutaiton };
};
