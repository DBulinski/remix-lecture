import { json } from "remix";
import fs from "fs/promises";

export interface Post {
  id: number;
  name: string;
  content: string;
}

const withCache = (data: Post | Post[]) => {
  return json(data, {
    headers: {
      "Cache-Control": "max-age=3600",
    },
  });
};

function fetchPosts(): Promise<Post[]> {
  return fs
    .readFile("./data/posts.json", "utf-8")
    .then(JSON.parse)
    .then(({ posts }) => posts);
}

export async function getPosts(): Promise<Response> {
  return fetchPosts().then(withCache);
}

export async function getPost(id: string): Promise<Response> {
  const posts = await fetchPosts();
  const post = posts.find((post) => post.id === Number(id));

  if (!post) {
    throw new Error(`Not found post with id: ${id}`);
  }

  return withCache(post);
}
