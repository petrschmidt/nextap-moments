import { useInfiniteQuery } from '@tanstack/react-query';
import { API_ENDPOINTS, apiFetcher, type PagingProps } from '../../utils';
import type { ApiResponse, Moment } from '../../types';

export const useGetUserMomentsQueryKey = 'steller-user-moments';
export const useGetUserMoments = (userId: string = '204993912312432428', paging?: PagingProps) => {
  return useInfiniteQuery({
    // ESlint doesn't realize that paging params shouldn't be part of the query key, therefore I'm
    // disabling the check here:
    // eslint-disable-next-line
    queryKey: [useGetUserMomentsQueryKey, userId],
    queryFn: ({ pageParam }) =>
      apiFetcher<UseGetUserMomentsResponse>(
        API_ENDPOINTS.getUserMoments({ userId }, { limit: paging?.limit, after: pageParam })
      ),
    initialPageParam: '0',
    getNextPageParam: (lastPage) => lastPage.cursor.after,
  });
};
export type UseGetUserMomentsResponse = ApiResponse<Moment[]>;
