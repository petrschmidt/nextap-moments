import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS, apiFetcher, type PagingProps } from '../../utils';
import type { ApiResponse, Moment } from '../../types';

export const useGetUserMomentsQueryKey = 'steller-user-moments';
export const useGetUserMoments = (userId: string = '204993912312432428', paging?: PagingProps) => {
  return useQuery({
    queryKey: [useGetUserMomentsQueryKey, userId, paging],
    queryFn: () =>
      apiFetcher<UseGetUserMomentsResponse>(API_ENDPOINTS.getUserMoments({ userId }, paging)),
  });
};
export type UseGetUserMomentsResponse = ApiResponse<Moment[]>;
