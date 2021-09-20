# HTTP Status Codes

> A simple app to respond with the same HTTP status code as was sent in the
> request to the server.

The app can be useful for testing how other apps respond to receiving responses
with different status codes in a really simple manner. It is built using
[TypeScript](https://www.typescriptlang.org/) and runs on the
Deno runtime, specifically [Deno Deploy](https://deno.com/deploy).

## Prerequisites

In order to develop and run scripts locally, both Deno and Deno Deploy need to
be available:

* [Deno](https://deno.land/manual/getting_started/installation)
* [deployctl](https://deno.com/deploy/docs/running-scripts-locally)

## Running locally

Start the app (in watch mode) by running:

```sh
deployctl run --watch main.ts
```

### Deno Deploy types

Deno Deploy is currently in Beta and experiences changes every so often. The
repo contains type definitions for Deno Deploy which are referenced by
[CoC](https://github.com/neoclide/coc.nvim) in the
[coc.settings](./.vim/coc-settings.json) file. If the type definitions change,
the file will need to be regenerated. This is achieved by running
`deployctl types > deploy.d.ts`.
