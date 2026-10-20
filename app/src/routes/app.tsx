import { createFileRoute, redirect } from "@tanstack/react-router";

// The Higgsfield template's app shell is not part of this site; send visitors home.
export const Route = createFileRoute("/app")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
