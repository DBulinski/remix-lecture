import { LoaderFunction, useLoaderData } from "remix";
import { getPost, Post } from "../../services/getPosts";

export const loader: LoaderFunction = ({ params }) => {
  const { post: id } = params;
  return getPost(String(id));
};

export default function Post() {
  const post = useLoaderData<Post>();

  return (
    <div>
      <h2>{post.name}</h2>
      <p>{post.content}</p>
    </div>
  );
}
