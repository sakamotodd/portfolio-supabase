// ISR ページ再生成
export const revalidateList = () => {
  fetch("/api/revalidated");
};
