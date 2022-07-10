import { NoteDTO } from "@/interface/types";
import { Header } from "@/layout/Header";
import { SideBar } from "@/layout/SideBar.tsx";
import Error from "@/pages/_error.page";
import { supabase } from "@/util/supabase";
import { PencilIcon, SearchIcon } from "@heroicons/react/solid";
import { makeStyles } from "@material-ui/styles";
import Pagination from "@mui/material/Pagination";
import { PostgrestError } from "@supabase/supabase-js";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { ContentItem } from "./ContentItem";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
}));
type StaticProps = {
  notes: NoteDTO[];
  error: PostgrestError | null;
  status: number;
};

const ContentPage: NextPage<StaticProps> = ({ notes, error, status }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [listFlag, setListFlag] = useState(false);
  const [pageDataMax, setPageDataMax] = useState<number>(10);
  const [pageDataMin, setPageDataMin] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageNumber] = useState(Math.ceil(notes?.length / 10));

  const listClickRef = useRef<HTMLButtonElement>(null!);
  const classes = useStyles();
  const router = useRouter();
  // 投稿ページ遷移ボタン(onClick)
  const handleMovePage = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  // ページネーション(onClick)
  const handlePageNation = useCallback(
    (e: ChangeEvent<unknown>, value: number) => {
      console.log("🚀 ~ file: index.page.tsx ~ line 57 ~ value", value);
      setPage(value);
      setPageDataMax(10 * value);
      setPageDataMin(10 * (value - 1));
      // router.push(`content/?page=${value}`);
    },
    [router],
  );

  const logout = () => {
    supabase.auth.signOut();
  };

  if (error && status !== 406) {
    return <Error statusCode={status} />;
  }

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
            {notes?.map((lie, index) => {
              return (
                pageDataMin <= index &&
                index < pageDataMax && (
                  <ContentItem
                    key={lie.id}
                    id={lie.id}
                    created_at={lie.created_at}
                    users={lie.users}
                    title={lie.title}
                  />
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
              onChange={(e, page) => handlePageNation(e, page)}
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
  const {
    data: notes,
    error,
    status,
  } = await supabase.from("notes").select("*, users(*)");
  return {
    props: { notes, error, status },
    revalidate: false,
  };
};
