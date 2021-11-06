import * as React from "react";

export function Loader(): JSX.Element | null {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="loader-container">
      <div className="loader" />
    </div>
  );
}
