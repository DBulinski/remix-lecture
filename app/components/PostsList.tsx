import { Link } from "remix";
import { Post } from "../services/postsService";

interface PostsListProps {
  posts: Post[];
}

export function PostsList({ posts }: PostsListProps) {
  return (
    <div className="list card">
      <h3>Recent posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link prefetch="intent" to={`/blog/${post.id}`}>
              {post.name}
            </Link>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
