import {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { PostForm } from "../../components/PostForm";
import { Post, postsService } from "../../services/postsService";

import postCss from "../../styles/admin/postForm.css";

export const action: ActionFunction = async ({ request, params }) => {
  const body = new URLSearchParams(await request.text());
  const name = body.get("name") as string;
  const content = body.get("content") as string;
  const src = body.get("src") as string;
  if (name && content && src) {
    await postsService.update({ src, name, content, id: Number(params.id) });
    return redirect("/admin/posts");
  } else {
    return {
      name: !name,
      content: !content,
      src: !src,
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
  postsService.getOne(Number(params.id));

export default function PostEditor(): JSX.Element {
  const post = useLoaderData<Post>();
  const { state } = useTransition();
  const errors = useActionData<{ [key in keyof Post]: boolean }>();

  const isSubmitting = state === "submitting";

  return (
    <PostForm
      buttonText="Update"
      disabled={isSubmitting}
      errors={errors}
      initialValues={post}
    />
  );
}
