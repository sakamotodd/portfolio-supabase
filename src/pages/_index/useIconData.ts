export const useIconData = () => {
  const tableContent = [
    {
      title: 'HTML',
      star: '★★★★★',
      photo: '/html.png',
      content: '主にNext.jsのJSX記法で勉強しました。',
    },
    {
      title: 'TypeScript',
      star: '★★★☆☆',
      photo: '/typescript.svg',
      content:
        'Javascriptを勉強する上で必須ということを知り、型の付け方について勉強しました。主にUdemyを活用し勉強しました。',
    },
    {
      title: 'GraphQL',
      star: '★★☆☆☆',
      photo: '/graphql.svg',
      content:
        'GraphQLの勉強をするためにUdemyを活用し勉強しました。データ間のやりとりでHASURAを使用しました。',
    },
    {
      title: 'CSS',
      star: '★★★★★',
      photo: '/tailwindcss.png',
      content: 'CSSは主にtailwindcssを活用し勉強しました。',
    },
    {
      title: 'C#',
      star: '★★★☆☆',
      photo: '/c-logo.png',
      content: '仕事の業務ではvisual studioを用いたC#での開発をやっていました。',
    },
    {
      title: 'Github',
      star: '★★★☆☆',
      photo: '/github.png',
      content: 'ソースコードはgithubを使用し、デプロイ先はVercelを活用していました。',
    },
    {
      title: 'React',
      star: '★★★★☆',
      photo: '/react.svg',
      content:
        'javascriptを活用するためにreactの勉強からはじめました。サーバーサイドの勉強もしたかったため、Next.jsのフレームワークを用いました。',
    },
    {
      title: 'Firebase',
      star: '★★★☆☆',
      photo: '/firebase.png',
      content: '認証機能、DBの操作としてfirebaseを用いました。主にUdemyの教材で勉強しました。',
    },
    {
      title: 'jest',
      star: '★★★☆☆',
      photo: '/jest.png',
      content: 'testの一環としてjestを活用しました。業務上では、NUnitでコーディングしていました。',
    },
  ];

  return { tableContent };
};
