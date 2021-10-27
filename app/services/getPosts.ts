import { json } from "remix";
import fs from "fs/promises";

export interface Post {
  id: number;
  name: string;
  content: string;
  src: string;
}

const delay = () => new Promise((res) => setTimeout(res, 1000));

const PATH = "./data/posts.json";

function fetchPosts(): Promise<Post[]> {
  return fs
    .readFile(PATH, "utf-8")
    .then(JSON.parse)
    .then(({ posts }) => posts);
}

export async function getPosts(): Promise<Response> {
  return fetchPosts().then(json);
}

export async function getPost(id: string): Promise<Response> {
  const posts = await fetchPosts();
  const post = posts.find((post) => post.id === Number(id));

  if (!post) {
    throw new Error(`Not found post with id: ${id}`);
  }

  return json(post);
}

export async function updatePost(newPost: Post): Promise<void> {
  const posts = await fetchPosts();
  const updatedPosts = posts.map((post) =>
    post.id === newPost.id ? newPost : post
  );
  await delay();
  await fs.writeFile(PATH, JSON.stringify({ posts: updatedPosts }));
}
