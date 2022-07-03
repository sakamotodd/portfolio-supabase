import { supabase } from "@/util/supabase";
import { NextPage } from "next";

const ContentPage: NextPage = () => {
  const signOut = () => {
    supabase.auth.signOut();
  };
  return (
    <div>
      <button onClick={signOut} className="border p-2">
        signOut
      </button>
    </div>
  );
};

export default ContentPage;
