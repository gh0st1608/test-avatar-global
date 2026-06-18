import type { HttpClientPort } from "@domain/ports/http-client.port";
import { env } from "@infrastructure/config/env";
import type {
  FetchHttpClientConfig
} from "@infrastructure/api/http-client.types";
import {
  createHttpRequestContext
} from "@infrastructure/api/http-interceptors";

export class FetchHttpClient implements HttpClientPort {
  private readonly baseUrl: string;

  constructor(config: string | FetchHttpClientConfig = {}) {
    const clientConfig =
      typeof config === "string" ? { baseUrl: config } : config;

    this.baseUrl = clientConfig.baseUrl ?? env.VITE_API_BASE_URL;
  }

  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    const context = createHttpRequestContext(this.baseUrl, path, options);

    try {
      const response = await fetch(context.url, context.options);

      return response.json() as Promise<T>;
      
    } catch (error) {
        throw error 
    }
  }

  get<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: "GET" });
  }

  post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  patch<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: "DELETE" });
  }
}
