import type {
  HttpRequestContext,
} from "@infrastructure/api/http-client.types";

export function createHttpRequestContext(
  baseUrl: string,
  path: string,
  options: RequestInit = {}
): HttpRequestContext {
  const method = options.method ?? "GET";

  return {
    path,
    url: `${baseUrl}${path}`,
    method,
    options: {
      ...options,
      headers: createHeaders(options.headers),
    },
    startedAt: performance.now(),
  };
}

function createHeaders(headers?: HeadersInit): Headers {
  const mergedHeaders = new Headers(headers);

  if (!mergedHeaders.has("Content-Type")) {
    mergedHeaders.set("Content-Type", "application/json");
  }

  return mergedHeaders;
}