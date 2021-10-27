import {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";

import { postsService, Post } from "../../services/postsService";

import postCss from "../../styles/blog/post.css";

export const loader: LoaderFunction = ({ params }) => {
  const { post: id } = params;
  return postsService.getOne(String(id));
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: postCss },
];

export const meta: MetaFunction = ({ data }) => ({
  title: data.name,
});

export default function Post() {
  const post = useLoaderData<Post>();

  return (
    <div className="card post-container">
      <img src={post.src} alt={post.name} />
      <h2>{post.name}</h2>
      <p dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
