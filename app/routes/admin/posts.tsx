import {
  ActionFunction,
  Link,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
  useLoaderData,
} from "remix";
import { RemoveItemForm } from "../../components/RemoveItemForm";
import { Plus } from "../../icons/Plus";
import { postsService, Post } from "../../services/postsService";

import classes from "../../styles/admin/admin.css";

export const action: ActionFunction = async ({ request }) => {
  const params = new URLSearchParams(await request.text());
  await postsService.remove(Number(params.get("id")));
  return redirect("/admin/posts");
};

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
      <Link className="add-post" to="/admin/posts/add">
        <div className="icon-container">
          <Plus />
        </div>
        <span>Add post</span>
      </Link>
      {posts.map((post) => (
        <Link to={`/admin/posts/${post.id}`} key={post.id}>
          <img loading="lazy" src={post.src} alt={post.name} />
          <span>{post.name}</span>
          <RemoveItemForm id={post.id} />
        </Link>
      ))}
    </div>
  );
}
