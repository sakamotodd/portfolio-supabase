import { EditNoteDTO } from "@/interface/types";
import useStore from "@/redux/store";
import { revalidateList } from "@/util/revalidate";
import { supabase } from "@/util/supabase";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export const useMutateContent = () => {
  const reset = useStore((state) => state.resetEditNote);
  const router = useRouter();
  const createNoteMutation = useMutation(
    async (note: EditNoteDTO) => {
      const { data, error } = await supabase.from("notes").insert(note);
      console.log("🚀 ~ file: useMutateContent.tsx ~ line 13 ~ error", error);
      console.log("🚀 ~ file: useMutateContent.tsx ~ line 13 ~ data", data);
      if (error) {
        return error.code;
      }
      return data;
    },
    {
      onSuccess: () => {
        revalidateList();
        reset();
        toast.success("書き込みに成功しました。");
        router.push("/edit");
      },
      onError: (error: any) => {
        toast.error("書き込みに失敗しました。再度	やりなおして下さい。");
        reset();
      },
    },
  );
  return { createNoteMutation };
};
