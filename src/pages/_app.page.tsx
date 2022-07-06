import "@/styles/globals.css";
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
import "../styles/Header.css";
import "../styles/markdown.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathName = ["content", "edit", "setting", "profile", "search"];
  const validateSession = async () => {
    console.log(
      "🚀 ~ file: _app.page.tsx ~ line 17 ~ MyApp ~ pathname",
      router.pathname,
    );
    const user = supabase.auth.user();
    const path = pathName.find((name) => {
      return router.pathname === name;
    });
    if (user) {
      if (path) {
        router.push(`/${path}`);
      }
      if (
        router.pathname === "/login/signUp" ||
        router.pathname === "/login/signIn" ||
        router.pathname === "/content"
      ) {
        return router.push("/content");
      }
    } else if (!user && router.pathname !== "/") {
      await router.push("/login/signIn");
    } else return;
  };
  supabase.auth.onAuthStateChange((event, session) => {
    console.log(
      "🚀 ~ file: _app.page.tsx ~ line 37 ~ supabase.auth.onAuthStateChange ~ event",
      event,
    );
    if (event === "SIGNED_IN") {
      router.push("/content");
    }
    if (event === "SIGNED_OUT") {
      router.push("/login/signIn");
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
