import { Link } from "react-router-dom";
import { Post } from "../services/getPosts";

interface PostsListProps {
  posts: Post[];
}

export function PostsList({ posts }: PostsListProps) {
  return (
    <div className="list">
      <h3>Recent posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.id}`}>{post.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
