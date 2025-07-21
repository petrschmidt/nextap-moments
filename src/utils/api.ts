export const BASE_API_URL = 'https://api.steller.co/v1';

export const apiFetcher = async <T>(endpoint: string, init?: RequestInit): Promise<T> => {
  return fetch(`${BASE_API_URL}${endpoint}`, init).then((res) => res.json());
};

export type PagingProps = {
  limit: number;
  before: string;
  after: string;
};

export const API_ENDPOINTS = {
  getUserMoments: (userId: string, paging?: PagingProps) => {
    return `/users/${userId}/moments`;
  },
};
