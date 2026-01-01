import dotenv from "dotenv";
dotenv.config();

console.log("--- ENV CHECK START ---");
const token = process.env.UPLOADTHING_TOKEN;
if (token) {
  console.log(`Token exists. Length: ${token.length}`);
  console.log(`Starts with: ${token.substring(0, 10)}`);
  console.log(`Ends with: ${token.substring(token.length - 10)}`);
  console.log(`Contains single quote: ${token.includes("'")}`);
  console.log(`Contains double quote: ${token.includes('"')}`);

  if (token.startsWith("'") || token.endsWith("'")) {
    console.log("CRITICAL: Token is wrapped in single quotes!");
  }
} else {
  console.log("UPLOADTHING_TOKEN is missing!");
}

console.log("Checking for legacy variables:");
console.log(
  "UPLOADTHING_SECRET:",
  !!process.env.UPLOADTHING_SECRET ? "Present" : "Absent"
);
console.log(
  "UPLOADTHING_APP_ID:",
  !!process.env.UPLOADTHING_APP_ID ? "Present" : "Absent"
);
console.log("--- ENV CHECK END ---");
