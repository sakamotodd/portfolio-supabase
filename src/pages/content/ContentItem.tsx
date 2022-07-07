import { NoteDTO } from "@/interface/types";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const ContentItem: FC<
  Omit<NoteDTO, "content" | "openFlag" | "user_id">
> = ({ id, users, created_at, title }) => {
  return (
    <Link href={`/content/${id}`} prefetch={false}>
      <button className="flex cursor-pointer justify-between rounded-md bg-white px-4 shadow-sm hover:bg-gray-50 dark:bg-darkCard dark:hover:bg-darkHover">
        <div className="mt-1 h-28 lg:h-full">
          <div className="flex h-1/3 items-center text-sm text-gray-400">
            {users.avatar_url.length > 0 && (
              <Image
                src={users.avatar_url}
                alt="ログイン画像"
                width={24}
                height={24}
                className="rounded-full bg-gray-200 bg-center"
              />
            )}
            <p className="pl-2">
              {`
            @${users.full_name}が${format(
                new Date(created_at),
                "yyyy年MM月dd (EEE)",
                {
                  locale: ja,
                },
              )}に投稿
              `}
            </p>
          </div>
          <div className="flex h-2/3 items-center pl-8 text-lg font-bold">
            <p className="">{title}</p>
          </div>
        </div>
      </button>
    </Link>
  );
};
