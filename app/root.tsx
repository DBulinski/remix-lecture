import type { LinksFunction, LoaderFunction } from "remix";
import { Meta, Links, Scripts, useLoaderData, LiveReload } from "remix";
import { Outlet } from "react-router-dom";
import { getPosts } from "./services/getPosts";
import { PostsList } from "./components/PostsList";
import { Header } from "./components/Layout/Header";

import global from "./styles/global.css";

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css",
    },
    { rel: "stylesheet", href: global },
  ];
};

export let loader: LoaderFunction = async () => {
  return getPosts();
};

export default function App() {
  const posts = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
      </head>
      <body>
        <LiveReload />
        <Header />
        <PostsList posts={posts} />
        <main>
          <Outlet />
        </main>
        <footer>Footer</footer>

        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <title>Oops!</title>
      </head>
      <body>
        <div>
          <h1>App Error</h1>
          <pre>{error.message}</pre>
          <p>
            Replace this UI with what you want users to see when your app throws
            uncaught errors.
          </p>
        </div>

        <Scripts />
      </body>
    </html>
  );
}
