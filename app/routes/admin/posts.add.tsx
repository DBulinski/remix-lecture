import { LinksFunction, MetaFunction } from "remix";
import { PostForm } from "../../components/PostForm";

import postFormCss from "../../styles/admin/postForm.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: postFormCss },
];

export const meta: MetaFunction = () => ({
  title: "Add new post",
});

export default function PostsAdder() {
  return <PostForm disabled={false} buttonText="Add" />;
}
