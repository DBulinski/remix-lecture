import {
  Link,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { postsService, Post } from "../../services/postsService";

import classes from "../../styles/admin/admin.css";

export const loader: LoaderFunction = () => postsService.get();

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
