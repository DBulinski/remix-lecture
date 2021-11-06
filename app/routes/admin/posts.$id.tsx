import {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { PostForm } from "../../components/PostForm";
import { Post, postsService } from "../../services/postsService";

import postFormCss from "../../styles/admin/postForm.css";

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

  return <PostForm initialValues={post} disabled={false} buttonText="Update" />;
}
