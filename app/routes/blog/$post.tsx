import { LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { getPost, Post } from "../../services/getPosts";

export const loader: LoaderFunction = ({ params }) => {
  const { post: id } = params;
  return getPost(String(id));
};

export const meta: MetaFunction = ({ data }) => ({
  title: data.name,
});

export default function Post() {
  const post = useLoaderData<Post>();

  return (
    <div>
      <img src={post.src} alt={post.name} />
      <h2>{post.name}</h2>
      <p>{post.content}</p>
    </div>
  );
}
