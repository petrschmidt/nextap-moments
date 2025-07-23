import { useMemo } from 'react';

export type UseVirtualItemsHookProps<T> = {
  initialItems: T[] | undefined;
  currentIndex: number;
  buffer?: number;
};

export type UseVirtualItemsHookReturn<T> = T[];
export type UseVirtualItemsHookType = <T>(
  props: UseVirtualItemsHookProps<T>
) => UseVirtualItemsHookReturn<T>;

const DEFAULT_BUFFER = 1;

export const getVirtualItems = <T>(
  initialItems: T[] | undefined,
  currentIndex: number,
  buffer: number
): T[] =>
  initialItems?.reduce((prev, item, index) => {
    if (index <= currentIndex + buffer && index >= currentIndex - buffer) {
      return [...prev, item];
    }
    return prev;
  }, [] as T[]) ?? [];

export const useVirtualItems: UseVirtualItemsHookType = ({
  initialItems,
  currentIndex,
  buffer = DEFAULT_BUFFER,
}) => {
  return useMemo(
    () => getVirtualItems(initialItems, currentIndex, buffer),
    [initialItems, currentIndex, buffer]
  );
};
