import { supabase } from "@/util/supabase";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNprogre from "nextjs-progressbar";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";
import "../styles/Header.css";
import "../styles/markdown.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter();
  const validateSession = async () => {
    const user = supabase.auth.user();
    if (user) {
      switch (pathname) {
        case "/":
          push("/content");
          break;
        case "/login/signIn":
          push("/content");
          break;
        case "/login/signUp":
          push("/content");
          break;
      }
    } else if (!user && pathname === "/content") {
      await push("/login/signIn");
    }
  };
  supabase.auth.onAuthStateChange((event, _) => {
    console.log(event);
    if (
      event === "SIGNED_IN" &&
      (pathname === "/login/signIn" || pathname === "/login/signUp")
    ) {
      push("/content");
    }
    if (event === "SIGNED_OUT") {
      push("/login/signIn");
    }
  });
  useEffect(() => {
    validateSession();
  }, []);
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
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "light",
            fontFamily: "Verdana, sans-serif",
          }}
        >
          <NotificationsProvider limit={2}>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
