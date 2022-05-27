# HTTP Status Codes

> A simple app to respond with the same HTTP status code as was sent in the
> request to the server.

The app can be useful for testing how other apps respond to receiving responses
with different status codes in a really simple manner. It is built using
[TypeScript](https://www.typescriptlang.org/) and runs on the
[Deno](https://deno.land/) runtime, specifically
[Deno Deploy](https://deno.com/deploy).

## Prerequisites

In order to develop and run scripts locally
[Deno](https://deno.land/manual/getting_started/installation)
must be installed.

## Running locally

Start the app (in watch mode) by running:

```sh
deno run --watch --allow-net=:8000 --allow-read --no-check main.tsx
```
