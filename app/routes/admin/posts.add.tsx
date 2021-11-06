import {
  ActionFunction,
  LinksFunction,
  MetaFunction,
  redirect,
  useActionData,
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

export default function PostsAdder() {
  const errors = useActionData<{ [key in keyof Post]: boolean }>();

  return <PostForm disabled={false} errors={errors} buttonText="Add" />;
}
