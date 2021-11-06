import {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";
import { PostForm } from "../../components/PostForm";
import { Post, postsService } from "../../services/postsService";

import postFormCss from "../../styles/admin/postForm.css";
import { validateURL } from "../../utils/validateURL";

export const action: ActionFunction = async ({ request, params }) => {
  const body = new URLSearchParams(await request.text());
  const name = body.get("name") as string;
  const content = body.get("content") as string;
  const src = body.get("src") as string;
  if (name && content && validateURL(src)) {
    await postsService.update({ src, name, content, id: Number(params.id) });
    return redirect("/admin/posts");
  } else {
    return {
      name: !name,
      content: !content,
      src: !validateURL(src),
    };
  }
};

export const loader: LoaderFunction = ({ params }) =>
  postsService.getOne(Number(params.id));

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: postFormCss },
];

export const meta: MetaFunction = () => ({
  title: "Update post",
});

export default function PostsUpdater() {
  const post = useLoaderData<Post>();
  const errors = useActionData<{ [key in keyof Post]: boolean }>();

  return (
    <PostForm
      initialValues={post}
      disabled={false}
      errors={errors}
      buttonText="Update"
    />
  );
}
