import * as React from "react";
import { useCatch } from "remix";
import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
  return {
    title: "Remix Blog",
    description: "Welcome to remix blog!",
  };
};

export default function HomePage() {
  return (
    <div>
      <h2>Welcome to blog!</h2>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const { message } = JSON.parse(caught.data);

  return (
    <div>
      <h2>Ups... Something went wrong</h2>
      <p>Error: {message}</p>
    </div>
  );
}
