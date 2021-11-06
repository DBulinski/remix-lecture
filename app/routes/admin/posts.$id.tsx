import { LinksFunction, MetaFunction } from "remix";
import { PostForm } from "../../components/PostForm";

import postFormCss from "../../styles/admin/postForm.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: postFormCss },
];

export const meta: MetaFunction = () => ({
  title: "Update post",
});

export default function PostsUpdater() {
  return <PostForm disabled={false} buttonText="Update" />;
}
