// /* eslint-disable tailwindcss/no-custom-classname */
// import { DocumentTextIcon } from '@heroicons/react/solid';
// import { onAuthStateChanged } from 'firebase/auth';
// import request from 'graphql-request';
// import { GetStaticPaths, GetStaticProps, NextPageWithLayout } from 'next';
// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import { FormEvent, ReactNode, useCallback, useEffect, useState } from 'react';
// import { toast } from 'react-hot-toast';
// import ReactMarkdown from 'react-markdown';
// import { dehydrate, QueryClient, useQueryClient } from 'react-query';
// import { useDispatch, useSelector } from 'react-redux';
// import remarkBreaks from 'remark-breaks';
// import remarkGfm from 'remark-gfm';
// import Cookies from 'universal-cookie';
// import MarkdownText from '../../../components/markdown';
// import { useMarkdownComponent } from '../../../components/markdown/useMarkdownComponent';
// import { NewsDTO, PrivateNewsDTO } from '../../../interface/types';
// import { Layout } from '../../../layout/Layout';
// import {
//   commentNewsState,
//   setCommentNewsReducer,
//   setUpdateNewsReducer
// } from '../../../redux/uiSlice';
// import { Auth } from '../../../util/firebase/firebase.config';
// import { GetAllNewsDocument } from '../../../util/GraphQL/generated/graphql';
// import { useMutationApp } from '../../../util/reactQuery/useMutationApp';
// import { privateNews } from '../../../util/reactQuery/useOrderNews';

// interface newsResDTO {
//   news: NewsDTO[];
// }
// const PrivateContentPage: NextPageWithLayout = () => {
//   const cookie = new Cookies();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const reduxCreateComment = useSelector(commentNewsState);
//   const HASURA_TOKEN_KEY = 'https://hasura.io/jwt/claims';
//   const queryClient = useQueryClient();
//   const data = queryClient.getQueryData<PrivateNewsDTO[]>('privateNews');
//   console.log("🚀 ~ file: index.page.tsx ~ line 41 ~ data", data)
//   const { components } = useMarkdownComponent();
//   const { createCommentMutation, deleteNewsMutation } = useMutationApp();
//   const [uid, setUid] = useState('');
//   // const result = data?.includes(uid);
//   // console.log('🚀 ~ file: index.page.tsx ~ line 45 ~ email', data);

//   // privateページボタン(onClick)

//   const editCommentHandle = useCallback(
//     (e: FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       createCommentMutation.mutate(reduxCreateComment);
//     },
//     [reduxCreateComment],
//   );

//   const updateHandle = useCallback(() => {
//     data?.map((update) => {
//       const handleUpdate = () => {
//         dispatch(
//           setUpdateNewsReducer({
//             id: update.id,
//             title: update.title,
//             content: update.content,
//             orderNo: update.orderNo,
//           }),
//         );
//       };
//       return handleUpdate();
//     });
//     router.push('/update');
//   }, []);

//   useEffect(() => {
//     const unSubUser = onAuthStateChanged(Auth, async (user) => {
//       try {
//         if (user) {
//           setUid(user?.uid);
//           // userに対応するtoken取得
//           const token = await user.getIdToken(true);
//           const idTokenResult = await user.getIdTokenResult();
//           // HASURAのカスタムクレームに基づいてるか確認
//           const hasuraClaims = idTokenResult.claims[HASURA_TOKEN_KEY];
//           // Cookieに格納
//           if (hasuraClaims) {
//             cookie.set('token', token, { path: '/' });
//             if (router.pathname === '/content/[id]') {
//               data?.map((page) => {
//                 const handlePrivatePage = () => {
//                   dispatch(
//                     setCommentNewsReducer({
//                       ...reduxCreateComment,
//                       groupNewsId: page.id,
//                       commentPhotURL: user?.photoURL,
//                       commentName: user?.displayName,
//                     }),
//                   );
//                 };
//                 return handlePrivatePage();
//               });
//             }
//           }
//         }
//       } catch (e) {
//         toast.error(e.message);
//       }
//     });
//     return () => {
//       unSubUser();
//     };
//   }, []);

//   return (
//     <div className="flex flex-col justify-center items-center p-4 font-hiragino dark:text-white">
//       <div className="mt-4 w-2/3 h-full">
//         <div className="flex justify-end items-center mb-4">
//           <button
//             type="button"
//             className="py-2 px-4 font-medium text-white bg-purple-700 hover:bg-purple-600 rounded-lg shadow-md transition-colors"
//             onClick={updateHandle}
//           >
//             編集
//           </button>
//         </div>
//         {data?.map((priNews) => {
//           return (
//             <div key={priNews.orderNo} className="bg-white dark:bg-darkCard rounded-md border">
//               <div className="py-8 w-full">
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center">
//                     <DocumentTextIcon className="w-8 h-8 dark:text-gray-300" />
//                     <label>
//                       <span className="pl-1 text-3xl font-bold">{priNews.title}</span>
//                     </label>
//                   </div>
//                 </div>
//                 <div className="flex justify-items-start mt-4">
//                   {priNews?.photoURL?.length > 0 && (
//                     <Image
//                       src={priNews?.photoURL}
//                       alt="ログイン画像"
//                       width={24}
//                       height={24}
//                       className="bg-center rounded-full"
//                     />
//                   )}
//                   <span className="ml-4">{priNews.name}</span>
//                 </div>
//               </div>
//               <div className="overflow-y-scroll py-4 px-2 markdown-preview">
//                 <ReactMarkdown
//                   className="markdown"
//                   remarkPlugins={[[remarkGfm, { singleTilde: false }], [remarkBreaks]]}
//                   components={components}
//                 >
//                   {priNews.content}
//                 </ReactMarkdown>
//               </div>
//             </div>
//           );
//         })}
//         <div className="mt-8">
//           {data?.length > 0 && data[0].comments?.length > 0 && (
//             <h1 className="text-2xl font-bold">コメント一覧</h1>
//           )}
//           <div>
//             {data?.map((user) => {
//               return (
//                 <div key={user.orderNo}>
//                   {user?.comments?.map((comment) => {
//                     return (
//                       <div key={comment.commentOrderNo} className="mt-4 rounded-md border">
//                         <div className="flex py-4 ">
//                           {comment?.comment_photURL?.length > 0 && (
//                             <Image
//                               src={comment?.comment_photURL}
//                               alt="アイコン"
//                               width={24}
//                               height={24}
//                               className=" bg-center rounded-full"
//                             />
//                           )}
//                           <span className="pl-2">{comment.comment_name}</span>
//                         </div>
//                         <div className="overflow-y-scroll py-4 px-2">
//                           <ReactMarkdown
//                             className="markdown"
//                             remarkPlugins={[[remarkGfm, { singleTilde: false }], [remarkBreaks]]}
//                             components={components}
//                           >
//                             {comment.commentText}
//                           </ReactMarkdown>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         <h1 className="mt-8 text-xl font-bold">コメントする</h1>
//         <form onSubmit={editCommentHandle}>
//           <div className="flex mt-4 mb-12 h-96">
//             <MarkdownText flag={false} updateFlag={false} />
//           </div>
//           <button className="py-2 px-4 mt-4 ml-2 font-medium text-white bg-purple-700 hover:bg-purple-600 rounded-lg shadow-md transition-colors">
//             コメントする
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PrivateContentPage;

// PrivateContentPage.getLayout = (page: ReactNode) => {
//   return (
//     <Layout title="個人ページ" styles="h-full">
//       {page}
//     </Layout>
//   );
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { news: data } = await request<newsResDTO>(
//     process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
//     GetAllNewsDocument,
//   );
//   const paths = data.map((order) => ({
//     params: { id: order.orderNo.toString(), commentId: order.id },
//   }));
//   return { paths, fallback: 'blocking' };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const id = Number(params.id);
//   const queryClient = new QueryClient();
//   // プリフェッチ
//   await queryClient.prefetchQuery('privateNews', () => privateNews(id));
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//     revalidate: 1,
//   };
// };
