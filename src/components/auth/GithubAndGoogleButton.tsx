import { supabase } from "@/util/supabase";
import Image from "next/image";
import { FC, useCallback } from "react";

export const GithubAndGoogleButton: FC = () => {
  const loginWithGithub = useCallback(async () => {
    supabase.auth.signIn({ provider: "github" });

  }, []);

    const loginWithGoogle = useCallback(async () => {
      supabase.auth.signIn({ provider: "google" });
    }, []);

  return (
    <div>
      <p className="text-center text-sm font-light text-gray-400">
        Sign in with
      </p>
      <div>
        <div className="mt-3 flex items-center justify-center space-x-6">
          <button
            className="flex transform items-center rounded border border-transparent bg-sky-100 py-2 px-4 text-sm font-medium uppercase text-indigo-500 shadow-md transition hover:-translate-y-0.5 hover:border-transparent hover:bg-sky-200 hover:text-gray-700 hover:shadow-lg"
            onClick={loginWithGithub}
          >
            <div className="mr-3">
              <Image alt="github" src="/github.svg" width={24} height={24} />
            </div>
            Github
          </button>
          <button
            className="flex transform items-center rounded border border-transparent bg-sky-100 py-2 px-4 text-sm font-medium uppercase text-indigo-500 shadow-md transition hover:-translate-y-0.5 hover:border-transparent hover:bg-gray-200 hover:text-gray-700 hover:shadow-lg"
            onClick={loginWithGoogle}
          >
            <div className="mr-3">
              <Image alt="github" src="/google.svg" width={24} height={24} />
            </div>
            <span>Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};
