import { Link } from "remix";

export function Header(): JSX.Element {
  return (
    <header>
      <h1>
        <Link to="/">Blog</Link>
      </h1>

      <Link to="/admin">Admin</Link>
    </header>
  );
}
