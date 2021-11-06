import {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { Cross } from "../../icons/Cross";
import { Plus } from "../../icons/Plus";
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
      <a className="add-post" href="#">
        <div className="icon-container">
          <Plus />
        </div>
        <span>Add post</span>
      </a>
      {posts.map((post) => (
        <a href="#" key={post.id}>
          <img loading="lazy" src={post.src} alt={post.name} />
          <span>{post.name}</span>
          <button
            onClick={(e) => e.stopPropagation()}
            type="submit"
            className="remove-button"
          >
            <Cross />
          </button>
        </a>
      ))}
    </div>
  );
}
