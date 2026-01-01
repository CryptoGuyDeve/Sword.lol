import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export routes for Next App Router
console.log(
  "UT Route Handler Loaded. Token starts with:",
  process.env.UPLOADTHING_TOKEN?.substring(0, 10)
);

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
