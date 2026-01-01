import { UTApi } from "uploadthing/server";

console.log("Initializing UTApi...");
try {
  const utapi = new UTApi();
  console.log("UTApi initialized successfully.");
  // Try a simple operation if possible, or just check if it didn't throw
  console.log(
    "Token used (masked):",
    process.env.UPLOADTHING_TOKEN ? "Present" : "Missing"
  );
} catch (error) {
  console.error("Failed to initialize UTApi:", error);
}
