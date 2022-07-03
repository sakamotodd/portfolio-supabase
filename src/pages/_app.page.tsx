import { AppProps } from "next/app";
import NextNprogre from "nextjs-progressbar";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/Header.css";
import "../styles/markdown.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <NextNprogre
          color="#29D"
          startPosition={0.2}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            className: "mt-16",
            loading: {
              duration: Infinity,
            },
          }}
        />
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
