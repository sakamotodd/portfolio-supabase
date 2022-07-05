import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { NewsDTO } from '../../interface/types';
import {
  commentNewsState,
  selectNews,
  setCommentNewsReducer,
  setUpdateNewsReducer,
} from '../../redux/uiSlice';
import { useMutationApp } from '../../util/reactQuery/useMutationApp';
import { useLogout } from './useLogout';

export const useContent = () => {
  const [pageDataMax, setPageDataMax] = useState<number>(10);
  const [pageDataMin, setPageDataMin] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<NewsDTO[]>('news');
  const router = useRouter();
  const pageNumber = Math.ceil(data?.length / 10);
  const { logout } = useLogout();
  const reduxCreateComment = useSelector(commentNewsState);
  const dispatch = useDispatch();

  const deleteId = {
    id: '',
  };

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

  // privateページボタン(onClick)
  const handlePrivatePage = useCallback(
    (orderNo: number, id: string, photoURL: string, name: string) => {
      dispatch(
        setCommentNewsReducer({
          ...reduxCreateComment,
          groupNewsId: id,
          commentPhotURL: photoURL,
          commentName: name,
        }),
      );
      router.push(`/content/${orderNo}`);
    },
    [router],
  );

  // 更新ボタン(onClick)
  const updateNewsButtonClick = useCallback((id: string, content: string, title: string) => {
    dispatch(setUpdateNewsReducer({ title: title, content: content, id: id }));
    router.push('/content/update');
  }, []);

  // 削除ボタン（onClick）
  const deleteNewsButtonClick = useCallback(({ id }) => {
    deleteId.id = id;
    deleteNewsMutation.mutate(deleteId);
  }, []);

  // ログアウトボタン(onClick)
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

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
  return {
    data,
    page,
    pageDataMax,
    pageDataMin,
    pageNumber,
    handlePrivatePage,
    handlePageNation,
    handleLogout,
    handleMovePage,
    updateNewsButtonClick,
    deleteNewsButtonClick,
  };
};
