/* eslint-disable tailwindcss/no-custom-classname */
import { supabase } from "@/util/supabase";
import Head from "next/head";
import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import { List } from "react-bootstrap-icons";
import { HeaderDTO } from "../../interface/types";

export const Header: FC<HeaderDTO> = ({
  title,
  darkMode,
  setDarkMode,
  listFlag,
  setListFlag,
  listClickRef,
}) => {
  const user = supabase.auth.user();
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const getAvatarUrl = async () => {
    try {
      setLoading(false);
      let { data, error, status } = await supabase
      .from("users")
      .select("avatar_url")
      .eq("id", user?.id)
      .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setAvatar(data?.avatar_url);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getAvatarUrl();
  });

  /**
   * theme切り替え
   */
  const handleChangeDarkMode = useCallback(() => {
    if (darkMode) {
      localStorage.theme = "light";
      setDarkMode(!darkMode);
    } else {
      localStorage.theme = "dark";
      setDarkMode(!darkMode);
    }
  }, [darkMode, setDarkMode]);

  /**
   * トグルボタン
   */
  const listClick = useCallback(() => {
    setListFlag((listFlag) => !listFlag);
  }, [listFlag]);

  /**
   * ダークモード対応
   */
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.querySelector("html")?.classList.add("dark");
    } else {
      setDarkMode(false);
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header
        className={`fixed z-10 flex h-14 w-full items-center justify-between bg-white px-3 dark:bg-darkCard ${
          listFlag &&
          "maxLg:pointer-events-none maxLg:cursor-default maxLg:transition maxLg:ease-in maxLg:dark:opacity-80"
        }
        `}
      >
        <div className="flex items-center">
          <button
            id="list"
            name="list"
            onClick={listClick}
            className={`${
              listFlag && "maxLg:hidden"
            } hover:rounded-full hover:bg-gray-100 dark:hover:bg-darkBody dark:hover:opacity-50`}
            ref={listClickRef}
          >
            <List className="h-10 w-10 p-2" />
          </button>
          <span className="pt-1 pl-2 text-indigo-600 text-shadow dark:text-gray-200">
            TweetApp
          </span>
        </div>
        <div className="flex items-center">
          <div className="relative mr-2 inline-block w-10 select-none align-middle transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              checked={darkMode}
              className="toggle-checkbox"
              onChange={handleChangeDarkMode}
            />
            <label htmlFor="toggle" className="toggle-label"></label>
          </div>
          {avatar && (
              <div className="mr-3">
                <Image
                  src={avatar}
                  alt="ログイン画像"
                  width={32}
                  height={32}
                  className="rounded-full bg-center"
                />
              </div>
          )}
        </div>
      </header>
    </>
  );
};
