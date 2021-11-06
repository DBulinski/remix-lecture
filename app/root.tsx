import * as React from "react";
import type { LinksFunction, MetaFunction } from "remix";
import {
  Meta,
  Links,
  Scripts,
  LiveReload,
  useCatch,
  useTransition,
} from "remix";
import { Outlet } from "react-router-dom";
import { Loader } from "./components/Loader";
import { useScrollRestoration } from "./utils/useScrollRestoration";
import { Header } from "./components/Header";

import global from "./styles/global.css";
import postsListStyles from "./styles/postsList.css";
import loaderStyles from "./styles/components/loader.css";

export const meta: MetaFunction = () => {
  return { title: "React Days 2021" };
};

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css",
    },
    { rel: "stylesheet", href: global },
    { rel: "stylesheet", href: postsListStyles },
    { rel: "stylesheet", href: loaderStyles },
  ];
};

function PageSkeleton({
  children,
}: React.PropsWithChildren<Record<string, unknown>>) {
  const { state } = useTransition();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="crossOrigin"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
      </head>
      <body>
        <LiveReload />
        <Header />
        {state !== "idle" && <Loader />}
        <main>{children}</main>
        <footer>Created for React Days 2021</footer>

        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useScrollRestoration();

  return (
    <PageSkeleton>
      <Outlet />
    </PageSkeleton>
  );
}

export function CatchBoundary() {
  const error = useCatch();

  return (
    <PageSkeleton>
      {error.status === 404 ? <h2>Page Not found</h2> : <h2>Unknown error</h2>}
    </PageSkeleton>
  );
}
