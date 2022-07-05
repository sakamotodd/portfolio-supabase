import { NoteDTO } from "@/interface/types";
import { supabase } from "@/util/supabase";
import { PencilIcon, SearchIcon } from "@heroicons/react/solid";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@material-ui/styles";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Header } from "../../layout/Header";
import { SideBar } from "../../layout/SideBar.tsx";
const useStyles = makeStyles(() => ({
  root: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
}));
type StaticProps = {
  notes: NoteDTO[];
};

const ContentPage: NextPage<StaticProps> = ({ notes }) => {
  console.log("🚀 ~ file: index.page.tsx ~ line 25 ~ notes", notes);
  const [darkMode, setDarkMode] = useState(false);
  const [listFlag, setListFlag] = useState(false);
  const [pageDataMax, setPageDataMax] = useState<number>(10);
  const [pageDataMin, setPageDataMin] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const listClickRef = useRef<HTMLButtonElement>(null!);
  const pageNumber = Math.ceil(notes?.length / 10);
  const classes = useStyles();
  const router = useRouter();
  // 投稿ページ遷移ボタン(onClick)
  const handleMovePage = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  // ページネーション表示データ
  useEffect(() => {
    if (router.query.page) {
      setPage(Number(router.query.page));
    }
  }, [router.query.page]);

  // ページネーション(onClick)
  const handlePageNation = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: number) => {
      setPage(value);
      setPageDataMax(10 * value);
      setPageDataMin(10 * (value - 1));
      router.push(`content/?page=${value}`, undefined, { shallow: true });
    },
    [router],
  );

  const logout = () => {
    supabase.auth.signOut();
  };

  return (
    <div
      className={`h-full max-h-screen w-screen font-helvetica text-black dark:text-gray-200 maxLg:relative ${
        listFlag && "maxLg:overflow-hidden"
      }`}
    >
      <Header
        title="TweetApp"
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        listFlag={listFlag}
        setListFlag={setListFlag}
        listClickRef={listClickRef}
      />
      <SideBar
        styles="h-full"
        listFlag={listFlag}
        setListFlag={setListFlag}
        listClickRef={listClickRef}
      >
        <div className=" relative z-20">
          <div className="fixed right-20 bottom-12 md:right-40">
            <button
              className="flex h-12 w-32 cursor-pointer items-center justify-center rounded-full bg-indigo-600 leading-7 hover:bg-indigo-500 maxLg:w-12 maxLg:rounded-full"
              onClick={() => handleMovePage("/edit")}
            >
              <PencilIcon className="h-4 w-4 text-white" />
              <span className="pl-2 text-center text-sm text-white maxLg:hidden">
                投稿する
              </span>
            </button>
          </div>
          <div className="fixed right-4 bottom-12">
            <button
              className="flex h-12 w-32 cursor-pointer items-center justify-center rounded-full bg-indigo-600 leading-7 hover:bg-indigo-500 maxLg:w-12 maxLg:rounded-full"
              onClick={() => handleMovePage("/search")}
            >
              <SearchIcon className="h-4 w-4 text-white" />
              <span className="pl-2 text-center text-sm text-white maxLg:hidden">
                検索する
              </span>
            </button>
          </div>
        </div>
        <div
          className={`m-auto w-2/3 font-hiragino ${
            listFlag &&
            "maxLg:cursor-default maxLg:opacity-60 maxLg:transition maxLg:ease-in"
          }`}
        >
          <h1 className="py-4 text-2xl text-gray-500">投稿一覧</h1>
          <div className="z-0 grid h-full grid-cols-1 gap-4 lg:h-[calc(100vh-3.5rem-9rem)] lg:grid-cols-2 lg:grid-rows-5">
            <button onClick={logout}>signOut</button>
            {notes?.map((lie, index) => {
              return (
                pageDataMin <= index &&
                index < pageDataMax && (
                  <button
                    className="flex cursor-pointer justify-between rounded-md bg-white px-4 shadow-sm hover:bg-gray-50 dark:bg-darkCard dark:hover:bg-darkHover"
                    key={lie?.id}
                  >
                    <div className="mt-1 h-28 lg:h-full">
                      <div className="flex h-1/3 items-center text-sm text-gray-400">
                        {lie?.users.avatar_url.length > 0 && (
                          <Image
                            src={lie?.users.avatar_url}
                            alt="ログイン画像"
                            width={24}
                            height={24}
                            className="rounded-full bg-gray-200 bg-center"
                          />
                        )}
                        <p className="pl-2">
                          {`
                      @${lie.users.full_name}が${format(
                            new Date(lie.created_at),
                            "yyyy年MM月dd (EEE)",
                            {
                              locale: ja,
                            },
                          )}に投稿
                      `}
                        </p>
                      </div>
                      <div className="flex h-2/3 items-center pl-8 text-lg font-bold">
                        <p className="">{lie.title}</p>
                      </div>
                    </div>
                  </button>
                )
              );
            })}
          </div>
          <div className="flex h-20 items-center justify-center">
            <Pagination
              className={darkMode ? classes.root : ""}
              count={pageNumber}
              color="primary"
              page={page}
              onChange={(e) => handlePageNation}
            />
          </div>
        </div>
      </SideBar>
    </div>
  );
};
export default ContentPage;

export const getStaticProps: GetStaticProps = async () => {
  console.log("ISR invoked - notes page");
  const { data: notes, error } = await supabase
    .from("notes")
    .select(
      "id, created_at, content, user_id, title, openFlag, users (email, full_name, avatar_url)",
    );
  if (error) {
    throw new Error(`${error.message}: ${error.details}`);
  }
  return {
    props: { notes },
    revalidate: false,
  };
};
