import type { MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Blog",
    description: "Welcome to remix blog!",
  };
};

export default function Index() {
  return (
    <div>
      <h2>Welcome to blog!</h2>
    </div>
  );
}
