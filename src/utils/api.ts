export const BASE_API_URL = 'https://api.steller.co/v1';

export const apiFetcher = async <T>(endpoint: string, init?: RequestInit): Promise<T> => {
  return fetch(`${BASE_API_URL}${endpoint}`, init).then((res) => res.json());
};

export type PagingProps = {
  limit?: number;
  before?: number;
  after?: number;
};

const prepareEndpoint = <T extends Record<string, unknown>>(baseFactory: (params: T) => string) => {
  return (params: T, paging?: PagingProps) => {
    const { ...baseParams } = params;

    const baseUrl = baseFactory(baseParams as T);

    if (!paging) return baseUrl;

    const searchParams = new URLSearchParams();
    if (paging.limit) searchParams.set('limit', paging.limit.toString());
    if (paging.after) searchParams.set('after', paging.after.toString());
    if (paging.before) searchParams.set('before', paging.before.toString());

    return `${baseUrl}?${searchParams.toString()}`;
  };
};

export const API_ENDPOINTS = {
  getUserMoments: prepareEndpoint(({ userId }: { userId: string }) => `/users/${userId}/moments`),
};
