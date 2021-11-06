import * as React from "react";
import {
  Link,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { postsService, Post } from "../../services/postsService";
import { ArrowRight } from "../../icons/ArrowRight";
import blogStyles from "../../styles/blog/blogList.css";

export const loader: LoaderFunction = () => postsService.get();

export const meta: MetaFunction = () => ({
  title: "Latest posts",
});

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: blogStyles,
  },
];

export default function PostPlaceholder(): JSX.Element {
  const posts = useLoaderData<Post[]>();

  return (
    <section>
      {posts.map((post) => (
        <Link
          key={post.id}
          prefetch="intent"
          to={`/blog/${post.id}`}
          className="post card"
        >
          <img src={post.src} alt={post.name} />
          <div className="post-content">
            <h4>{post.name}</h4>
            <div className="read-more">
              <span>Read more</span>
              <ArrowRight className="arrow" />
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
