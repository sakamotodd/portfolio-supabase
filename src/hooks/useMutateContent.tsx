import { EditNoteDTO } from "@/interface/types";
import useStore from "@/redux/store";
import { revalidateList } from "@/util/revalidate";
import { supabase } from "@/util/supabase";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export const useMutateContent = () => {
  const reset = useStore((state) => state.resetEditNote);
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
        reset();
        toast.success("書き込みに成功しました。");
      },
      onError: () => {
        toast.error("書き込みに失敗しました。再度	やりなおして下さい。");
        reset();
      },
    },
  );
  return { createNoteMutation };
};
