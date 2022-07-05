import { supabase } from "@/util/supabase";

export const logout = async () => {
  await supabase.auth.signOut();
};
