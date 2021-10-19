import {
  Link,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { getPosts, Post } from "../../services/getPosts";

import classes from "../../styles/admin.css";

export const loader: LoaderFunction = () => {
  return getPosts();
};

export const links: LinksFunction = () => [
  { href: classes, rel: "stylesheet" },
];

export const meta: MetaFunction = () => ({
  title: "Admin panel",
});

export default function Admin() {
  const posts = useLoaderData<Post[]>();

  return (
    <div className="posts">
      {posts.map((post) => (
        <Link to={`/admin/posts/${post.id}`} key={post.id}>
          <img loading="lazy" src={post.src} alt={post.name} />
          <span>{post.name}</span>
        </Link>
      ))}
    </div>
  );
}
