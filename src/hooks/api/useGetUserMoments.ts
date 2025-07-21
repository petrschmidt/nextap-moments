import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS, apiFetcher } from '../../utils';
import type { ApiResponse, Moment } from '../../types';

export const useGetUserMomentsQueryKey = 'steller-user-moments';
export const useGetUserMoments = (userId: string = '204993912312432428') => {
  return useQuery({
    queryKey: [useGetUserMomentsQueryKey, userId],
    queryFn: () => apiFetcher<UseGetUserMomentsResponse>(API_ENDPOINTS.getUserMoments(userId)),
  });
};
export type UseGetUserMomentsResponse = ApiResponse<Moment[]>;
