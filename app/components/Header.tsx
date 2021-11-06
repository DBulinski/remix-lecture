import { Link } from "remix";

export function Header(): JSX.Element {
  return (
    <header>
      <h1>
        <Link to="/blog">Blog</Link>
      </h1>

      <Link to="/admin/posts">Admin</Link>
    </header>
  );
}
