import { json } from "remix";
import fs from "fs/promises";

export interface Post {
  id: number;
  name: string;
  content: string;
  src: string;
}

export interface PostsService {
  get: () => Promise<Response>;
  getOne: (id: number) => Promise<Response>;
  add: (newPost: Omit<Post, "id">) => Promise<void>;
  update: (newPost: Post) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

const delay = () => new Promise((res) => setTimeout(res, 1000));

const PATH = "./data/posts.json";

function fetchPosts(): Promise<Post[]> {
  return fs
    .readFile(PATH, "utf-8")
    .then(JSON.parse)
    .then(({ posts }) => posts);
}

async function savePosts(posts: Post[]): Promise<void> {
  await delay();
  await fs.writeFile(PATH, JSON.stringify({ posts }));
}

export const postsService: PostsService = {
  get: () => fetchPosts().then(json),
  getOne: async (id) => {
    const posts = await fetchPosts();
    const post = posts.find((post) => post.id === id);

    if (!post) {
      throw new Error(`Not found post with id: ${id}`);
    }

    return json(post);
  },
  add: async (newPost) => {
    const posts = await fetchPosts();
    const nextId = Math.max(...posts.map(({ id }) => id)) + 1;
    const updatedPosts: Post[] = [{ ...newPost, id: nextId }, ...posts];
    await savePosts(updatedPosts);
  },
  update: async (newPost) => {
    const posts = await fetchPosts();
    const updatedPosts = posts.map((post) =>
      post.id === newPost.id ? newPost : post
    );
    await savePosts(updatedPosts);
  },
  remove: async (id) => {
    const posts = await fetchPosts();
    const updatedPosts = posts.filter((post) => post.id !== id);
    await savePosts(updatedPosts);
  },
};
