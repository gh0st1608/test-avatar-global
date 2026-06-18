type MaybePromise<T> = T | Promise<T>;

export interface HttpRequestContext {
  path: string;
  url: string;
  method: string;
  options: RequestInit;
  startedAt: number;
}

export interface FetchHttpClientConfig {
  baseUrl?: string;
  interceptors?: HttpInterceptor[];
}

export interface HttpInterceptor {
  onRequest?(context: HttpRequestContext): MaybePromise<void>;
  onResponse?(
    context: HttpRequestContext,
    response: Response
  ): MaybePromise<void>;
  onError?(context: HttpRequestContext, error: unknown): MaybePromise<void>;
}