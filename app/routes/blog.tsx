import * as React from "react";
import { LinksFunction, LoaderFunction, useLoaderData } from "remix";
import { Outlet } from "react-router-dom";
import { PostsList } from "../components/PostsList";
import { postsService, Post } from "../services/postsService";

import blogStyles from "../styles/blog/blog.css";

export const loader: LoaderFunction = () => postsService.get();

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: blogStyles,
  },
];

export default function Blog() {
  const posts = useLoaderData<Post[]>();

  return (
    <section className="content">
      <Outlet />
      <PostsList posts={posts.slice(0, 4)} />
    </section>
  );
}
