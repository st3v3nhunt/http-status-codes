import statusCodes from "./src/status-codes.ts";

function generateResponse(status: number): Response {
  return new Response(JSON.stringify(statusCodes[status]), {
    headers: { "content-type": "application/json; charset=UTF-8" },
    // Prevent error when status code < 200 - https://github.com/denoland/deno/blob/v1.14.0/ext/fetch/23_response.js#L266
    status: status < 200 ? 200 : status,
    statusText: "statusText",
  });
}

function getStatusCode(url: string): number {
  const { pathname } = new URL(url);
  const statusRaw = pathname.split("/")[1];
  return parseInt(statusRaw, 10);
}

async function handleRequest(request: Request): Promise<Response> {
  // console.log(request);
  const url = new URL(request.url);
  console.log(url);
  const path = url.pathname;
  if (path === "/") {
    const file = await Deno.readFile("./assets/views/home.html");
    return new Response(file, {
      headers: { "content-type": "text/html" },
    });
  } else if (path.endsWith(".ico")) {
    const iconPath = path.split('/').pop()
    const file = await Deno.readFile(`./assets/img/${iconPath}`);
    return new Response(file, {
      headers: { "content-type": "image/x-icon" },
    });
  } else if (path.endsWith(".png")) {
    const imagePath = path.split('/').pop()
    const file = await Deno.readFile(`./assets/img/${imagePath}`);
    return new Response(file, {
      headers: { "content-type": "image/png" },
    });
  }
  const statusCode = getStatusCode(request.url);
  if (isNaN(statusCode)) {
    return generateResponse(400);
  }
  console.log("Status:", statusCode);
  return generateResponse(statusCode);
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});
