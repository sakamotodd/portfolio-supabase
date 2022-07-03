import { GithubAndGoogleButton } from "@/components/auth/GithubAndGoogleButton";
import { supabase } from "@/util/supabase";
import { MailFormSignIn } from "./MailFormSignIn";

export default function signInPage() {
  const user = supabase.auth.user();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 font-hiragino opacity-80">
      <div className="mx-auto rounded-lg bg-slate-100 p-8 lg:px-20">
        <GithubAndGoogleButton />
        <MailFormSignIn />
      </div>
    </div>
  );
}
