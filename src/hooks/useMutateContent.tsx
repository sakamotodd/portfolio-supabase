import { EditNoteDTO, UpdateNoteDTO } from "@/interface/types";
import useStore from "@/redux/store";
import { revalidateList, revalidatePrivate } from "@/util/revalidate";
import { supabase } from "@/util/supabase";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export const useMutateContent = () => {
  const router = useRouter();
  const resetInsertNote = useStore((state) => state.resetEditNote);
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
   * UPDATE notes by update/[id]
   */
  const updateNoteMutation = useMutation(
    async (note: UpdateNoteDTO) => {
      const { data, error, status } = await supabase
        .from("notes")
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
      },
      onError: () => {
        toast.error("記事の更新に失敗しました。再度やり直して下さい。");
        resetUpdateNote();
      },
    },
  );

  /**
   * DELETE note by update/[id]
   */

  const deleteNoteMutation = useMutation(
    async (id: string) => {
      const { data, error, status } = await supabase
        .from("notes")
        .delete()
        .eq("id", id);
      if (error && status !== 406) {
        console.log(
          "🚀 ~ file: useMutateContent.tsx ~ line 79 ~ status",
          status,
        );
        console.log("🚀 ~ file: useMutateContent.tsx ~ line 79 ~ error", error);
        throw status;
      }
      return data;
    },
    {
      onSuccess: (res: any) => {
        revalidateList();
        revalidatePrivate(res[0].id);
        toast.success("記事の削除に成功しました。");
        resetUpdateNote();
        router.push("/edit");
      },
      onError: () => {
        toast.error("記事の削除に失敗しました。再度やり直して下さい。");
        resetUpdateNote();
      },
    },
  );
  return { createNoteMutation, updateNoteMutation, deleteNoteMutation };
};
