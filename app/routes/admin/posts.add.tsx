import {
  ActionFunction,
  LinksFunction,
  MetaFunction,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import { PostForm } from "../../components/PostForm";
import { Post, postsService } from "../../services/postsService";
import postFormCss from "../../styles/admin/postForm.css";
import { validateURL } from "../../utils/validateURL";

export const action: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());
  const name = body.get("name") as string;
  const content = body.get("content") as string;
  const src = body.get("src") as string;
  if (name && content && validateURL(src)) {
    await postsService.add({ src, name, content });
    return redirect("/admin/posts");
  } else {
    return {
      name: !name,
      content: !content,
      src: !validateURL(src),
    };
  }
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: postFormCss },
];

export const meta: MetaFunction = () => ({
  title: "Add new post",
});

export default function PostAdder() {
  const { state } = useTransition();
  const errors = useActionData<{ [key in keyof Post]: boolean }>();

  const isSubmitting = state === "submitting";

  return <PostForm buttonText="Add" disabled={isSubmitting} errors={errors} />;
}
