import { EditCommentsDTO, EditNoteDTO, UpdateNoteDTO } from "@/interface/types";
import useStore from "@/redux/store";
import { revalidateList, revalidatePrivate } from "@/util/revalidate";
import { supabase } from "@/util/supabase";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export const useMutateContent = () => {
  const resetInsertNote = useStore((state) => state.resetEditNote);
  const resetInsertComment = useStore((state) => state.resetEditComment);
  const resetUpdateNote = useStore((state) => state.resetUpdateNote);

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
        resetInsertNote();
        toast.success("書き込みに成功しました。");
      },
      onError: () => {
        toast.error("書き込みに失敗しました。再度やりなおして下さい。");
        resetInsertNote();
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
      if (error && status !== 406) {
        throw status;
      }
      return data;
    },
    {
      onSuccess: (res: any) => {
        console.log(
          "🚀 ~ file: useMutateContent.tsx ~ line 51 ~ useMutateContent ~ res",
          res,
        );
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

  const updateNoteMutation = useMutation(
    async (note: UpdateNoteDTO) => {
      const { data, error, status } = await supabase
        .from("note")
        .update({
          title: note.title,
          content: note.content,
          openFlag: note.openFlag,
        })
        .eq("id", note.id);
      if (error && status !== 406) {
        throw status;
      }
      return data;
    },
    {
      onSuccess: (res: any) => {
        revalidateList();
        revalidatePrivate(res[0].id);
        toast.success("記事の更新に成功しました。");
        resetUpdateNote();
      },
      onError: (res: any) => {
        toast.error("記事の更新に失敗しました。再度やり直して下さい。");
        resetUpdateNote();
      },
    },
  );
  return { createNoteMutation, updateNoteMutation, createCommentMutaiton,  };
};
