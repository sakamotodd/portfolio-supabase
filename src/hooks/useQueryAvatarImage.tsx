import { AvatarDTO } from "@/interface/types";
import { supabase } from "@/util/supabase";
import { useQuery } from "react-query";

export const useQueryAvatarImage = () => {
  const getAvatarUrl = async () => {
    const { data, error, status } = await supabase
      .from("users")
      .select("avatar_url")
      .eq("id", supabase.auth.user()?.id)
      .single();
      if (error && status !== 406) {
        throw status;
      }
    return data;
  };
  return useQuery<AvatarDTO, Error>({
    queryKey: ["users"],
    queryFn: getAvatarUrl,
    staleTime: 0,
  });
};
