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

/**
 * Function that return subset of `initialItems` with current item (index) and buffer before
 * and after the item.
 */
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

/**
 * Items virtualizer hook. Receives array of all items and returns item based on current index
 * along with specified buffer before and after the current item.
 * @param initialItems - Full array of items that should be virtualized
 * @param currentIndex - Index of the current item
 * @param buffer - Buffer (items) before and after the current item
 */
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
