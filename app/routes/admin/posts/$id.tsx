import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import { getPost, Post, updatePost } from "../../../services/getPosts";

export const action: ActionFunction = async ({ request, params }) => {
  const body = new URLSearchParams(await request.text());
  const name = body.get("name") as string;
  const content = body.get("content") as string;
  await updatePost({ name, content, id: Number(params.id) });
  return redirect("/admin");
};

export const loader: LoaderFunction = ({ params }) =>
  getPost(String(params.id));

export default function PostEditor(): JSX.Element {
  const post = useLoaderData<Post>();

  return (
    <Form method="post">
      <label>
        Name
        <input defaultValue={post.name} name="name" />
      </label>
      <label>
        Content
        <textarea defaultValue={post.content} name="content" />
      </label>
      <button type="submit">Update</button>
    </Form>
  );
}
