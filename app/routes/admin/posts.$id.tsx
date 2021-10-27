import {
  ActionFunction,
  Form,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { getPost, Post, updatePost } from "../../services/getPosts";
import { Input } from "../../components/Input";

import postCss from "../../styles/postForm.css";

export const action: ActionFunction = async ({ request, params }) => {
  const body = new URLSearchParams(await request.text());
  const name = body.get("name") as string;
  const content = body.get("content") as string;
  const src = body.get("src") as string;
  if (name && content && src) {
    await updatePost({ src, name, content, id: Number(params.id) });
    return redirect("/admin");
  } else {
    return {
      name: !Boolean(name),
      content: !Boolean(content),
      file: !Boolean(src),
    };
  }
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: postCss },
];

export const meta: MetaFunction = () => ({
  title: "Update post",
});

export const loader: LoaderFunction = ({ params }) =>
  getPost(String(params.id));

export default function PostEditor(): JSX.Element {
  const post = useLoaderData<Post>();
  const { state } = useTransition();
  const errors = useActionData<{ [key in keyof Post]: boolean }>();

  const isSubmitting = state === "submitting";

  return (
    <>
      <Form method="post" className="form card">
        <Input
          disabled={isSubmitting}
          error={errors?.name}
          name="name"
          defaultValue={post.name}
          label="Name"
        />
        <Input
          disabled={isSubmitting}
          error={errors?.content}
          multiline
          name="content"
          defaultValue={post.content}
          label="Content"
        />
        <Input
          error={errors?.src}
          defaultValue={post.src}
          label="File path"
          name="src"
        />
        <button disabled={isSubmitting} type="submit">
          Update
        </button>
      </Form>
    </>
  );
}
