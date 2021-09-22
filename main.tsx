import statusCodes from "./src/status-codes.ts";
import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js";
import { renderToString } from "https://x.lcas.dev/preact@10.5.12/ssr.js";

function isStatusInRange(status: number): boolean {
  return status > 199 && status < 600;
}

function doesStatusCauseError(status: number): boolean {
  return status === 304;
}

function generateResponse(status: number): Response {
  console.log("Response status:", status);
  return new Response(JSON.stringify(statusCodes[status]), {
    headers: { "content-type": "application/json; charset=UTF-8" },
    // In order to prevent errors for certain status codes and
    // only return those in valid range return a 200
    status: !isStatusInRange(status) || doesStatusCauseError(status)
      ? 200
      : status,
    statusText: "statusText something",
  });
}

function getStatusCode(url: string): number {
  const { pathname } = new URL(url);
  const statusRaw = pathname.split("/")[1];
  return parseInt(statusRaw, 10);
}

function App() {
  return (
    <html lang="en">
      <head>
        <title>HTTP Status Codes</title>
      </head>
    <body>
    <h1>HTTP Status Codes</h1>
    </body>
    </html>
  );
}

async function handleRequest(request: Request): Promise<Response> {
  console.log("Request:", request);
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/") {
    return new Response('<!DOCTYPE html>' + renderToString(<App />), {
      headers: { "content-type": "text/html" },
    });
  } else if (path.endsWith(".ico")) {
    const iconPath = path.split("/").pop();
    const file = await Deno.readFile(`./assets/img/${iconPath}`);
    return new Response(file, {
      headers: { "content-type": "image/x-icon" },
    });
  } else if (path.endsWith(".png")) {
    const imagePath = path.split("/").pop();
    const file = await Deno.readFile(`./assets/img/${imagePath}`);
    return new Response(file, {
      headers: { "content-type": "image/png" },
    });
  }

  const statusCode = getStatusCode(request.url);
  return isNaN(statusCode) || !isStatusInRange(statusCode)
    ? generateResponse(400)
    : generateResponse(statusCode);
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});
