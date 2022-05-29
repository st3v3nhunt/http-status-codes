import { serve } from "https://deno.land/std@0.141.0/http/server.ts";
import { renderToString } from "https://esm.sh/preact-render-to-string@5.2.0";
import statusCodes from "./src/status-codes.ts";

function isStatusInRange(status: number): boolean {
  return status > 199 && status < 600;
}

function doesStatusCauseError(status: number): boolean {
  return status === 304;
}

function generateResponse(status: number): Response {
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

function getStatusCode(url: URL): number {
  const { pathname } = url;
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
        <p>{new Date().toLocaleString()}</p>
      </body>
    </html>
  );
}

async function handleRequest(request: Request): Promise<Response> {
  const start = performance.now();
  console.log("Request:", request);
  const url = new URL(request.url);
  const path = url.pathname;
  let response;

  if (path === "/") {
    response = new Response(renderToString(App()), {
      headers: { "content-type": "text/html" },
    });
  } else if (path.endsWith(".ico")) {
    const iconPath = path.split("/").pop();
    const file = await Deno.readFile(`./assets/img/${iconPath}`);
    response = new Response(file, {
      headers: { "content-type": "image/x-icon" },
    });
  } else if (path.endsWith(".png")) {
    const imagePath = path.split("/").pop();
    const file = await Deno.readFile(`./assets/img/${imagePath}`);
    response = new Response(file, {
      headers: { "content-type": "image/png" },
    });
  } else {
    const statusCode = getStatusCode(url);
    response = isNaN(statusCode) || !isStatusInRange(statusCode)
      ? generateResponse(400)
      : generateResponse(statusCode);
  }
  const end = performance.now();
  console.log(`Request for ${path} took ${end - start} milliseconds.`);
  return response;
}

serve(handleRequest);
console.log("Listening on port 8000");
