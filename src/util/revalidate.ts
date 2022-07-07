// ISR ページ再生成
export const revalidateList = () => {
  fetch("/api/revalidated");
};

export const revalidatePrivate = (id: string) => {
  fetch(`/api/revalidated/${id}`);
}
