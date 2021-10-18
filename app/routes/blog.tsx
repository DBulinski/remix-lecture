import { LinksFunction, LoaderFunction, useLoaderData } from "remix";
import { Outlet } from "react-router-dom";
import { PostsList } from "../components/PostsList";
import { getPosts, Post } from "../services/getPosts";

import blogStyles from "../styles/blog.css";

export const loader: LoaderFunction = getPosts;

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
      <PostsList posts={posts} />
    </section>
  );
}
