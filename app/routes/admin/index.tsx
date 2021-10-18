import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { getPosts, Post } from "../../services/getPosts";

export const loader: LoaderFunction = () => {
  return getPosts();
};

export const meta: MetaFunction = () => ({
  title: "Admin panel",
});

export default function Admin() {
  const posts = useLoaderData<Post[]>();

  return (
    <div>
      {posts.map((post) => (
        <Link to={`/admin/posts/${post.id}`} key={post.id}>
          {post.name}
        </Link>
      ))}
    </div>
  );
}
