import {
  Link,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { getPosts, Post } from "../../services/getPosts";
import { ArrowRight } from "../../icons/ArrowRight";
import blogStyles from "../../styles/blogList.css";

export const loader: LoaderFunction = () => getPosts();

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
    <article>
      {posts.map((post) => (
        <Link prefetch="intent" to={`/blog/${post.id}`} className="post card">
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
    </article>
  );
}
