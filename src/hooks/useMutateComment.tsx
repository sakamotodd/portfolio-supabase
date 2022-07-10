import { EditCommentsDTO } from "@/interface/types";
import useStore from "@/redux/store";
import { revalidatePrivate } from "@/util/revalidate";
import { supabase } from "@/util/supabase";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export const useMutateComment = () => {
  const resetInsertComment = useStore((state) => state.resetEditComment);

  /**
   * Insert comments As create comment by content/[id]
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

  /**
   * 
   */

  return { createCommentMutaiton };
};
