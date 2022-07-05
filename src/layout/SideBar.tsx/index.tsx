import {
  CogIcon,
  HomeIcon,
  PencilAltIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { SideBarDTO } from "../../interface/types";

export const SideBar: FC<SideBarDTO> = ({
  children,
  listFlag,
  setListFlag,
  listClickRef,
}) => {
  const router = useRouter();
  const [selectMode, setSelectMode] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null!);

  const handleOutsideClick = useCallback(
    (e: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !listClickRef.current.contains(e.target)
      ) {
        if (
          typeof e.target?.className !== undefined &&
          typeof e.target.className === "string"
        ) {
          if (
            e.target?.className.indexOf(
              "flex w-screen bg-white dark:bg-darkCard",
            ) > -1
          ) {
            setListFlag(false);
          } else if (
            e.target?.className.indexOf(
              "maxLg:relative w-screen h-full max-h-screen font-helvetica text-black dark:text-gray-200 maxLg:overflow-hidden",
            ) > -1
          ) {
            setListFlag(false);
          } else {
            return;
          }
        } else {
          return;
        }
      }
    },
    [dropdownRef, listClickRef],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    if (router.pathname === "/content") {
      return setSelectMode("content");
    } else if (router.pathname === "/post") {
      return setSelectMode("post");
    } else if (router.pathname === "/setting") {
      return setSelectMode("setting");
    } else if (router.pathname === "/profile") {
      return setSelectMode("profile");
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [router]);

  const XIconClick = useCallback(() => {
    setListFlag(false);
  }, []);

  const ITEM = [
    {
      id: 1,
      path: "content",
      Icon: HomeIcon,
      text: "ホーム",
    },
    {
      id: 2,
      path: "post",
      Icon: PencilAltIcon,
      text: "投稿",
    },
    {
      id: 3,
      path: "profile",
      Icon: UserIcon,
      text: "マイページ",
    },
    {
      id: 4,
      path: "setting",
      Icon: CogIcon,
      text: "設定",
    },
  ];

  return (
    <div className="flex w-screen bg-white dark:bg-darkCard">
      <aside
        className={`fixed border-[1px] text-sm text-gray-600 dark:border-gray-600 dark:text-white md:mt-14 md:h-[calc(100vh-3.5rem)] maxLg:h-screen ${
          listFlag
            ? "z-0 w-40 font-helvetica dark:bg-darkCard md:block maxLg:absolute maxLg:left-0 maxLg:top-0 maxLg:z-50 maxLg:bg-white"
            : "hidden font-helvetica md:block md:w-16"
        }`}
        ref={dropdownRef}
      >
        <button
          className={`flex items-center px-3 md:hidden ${
            !listFlag && "hidden"
          }`}
        >
          <XIcon
            className="h-10 w-10 cursor-pointer p-2 hover:rounded-full hover:bg-gray-100 dark:hover:bg-darkHover"
            onClick={XIconClick}
          />
        </button>
        {ITEM.map((item) => {
          return (
            <button
              key={item.id}
              className={`${
                listFlag && "w-40"
              } flex cursor-pointer items-center px-3 ${
                selectMode === `${item.path}`
                  ? " bg-selectBlue"
                  : "hover:bg-gray-100 dark:hover:bg-darkHover"
              }`}
              onClick={() => router.push(`/${item.path}`)}
              disabled={selectMode === `${item.path}` ? true : false}
            >
              <item.Icon
                className={`h-10 w-10 p-2 ${
                  selectMode === `${item.path}` && " text-blue-300"
                }`}
              />
              <span className={`pl-4 ${!listFlag && "hidden"}`}>
                {item.text}
              </span>
            </button>
          );
        })}
      </aside>
      <main
        className={`${
          listFlag
            ? "md:ml-40 md:w-[calc(100vw-10rem)] maxLg:pointer-events-none maxLg:cursor-default maxLg:transition maxLg:ease-in maxLg:dark:opacity-80"
            : "md:ml-16 md:w-[calc(100vw-4rem)]"
        } z-0 mt-14 h-full min-h-[calc(100vh-3.5rem)] w-screen border-t-[1px] bg-slate-100 dark:border-gray-600 dark:bg-darkBody`}
      >
        {children}
      </main>
    </div>
  );
};
