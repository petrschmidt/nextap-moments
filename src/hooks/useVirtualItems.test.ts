import { describe, expect, it } from 'vitest';
import { getVirtualItems } from './useVirtualItems';

describe('useVirtualItems', () => {
  const generatedArray = [...Array(20)].map((_, i) => ({ index: i }));

  describe('getVirtualItems', () => {
    it('returns an empty array when initialItems is undefined', () => {
      expect(getVirtualItems(undefined, 0, 1)).toEqual([]);
    });

    it('returns correct subset of large array based on index and buffer', () => {
      const generatedArray = [...Array(20)].map((_, i) => ({ index: i }));

      expect(getVirtualItems(generatedArray, 0, 1)).toEqual([{ index: 0 }, { index: 1 }]);
      expect(getVirtualItems(generatedArray, 1, 1)).toEqual([
        { index: 0 },
        { index: 1 },
        { index: 2 },
      ]);
      expect(getVirtualItems(generatedArray, 1, 2)).toEqual([
        { index: 0 },
        { index: 1 },
        { index: 2 },
        { index: 3 },
      ]);

      expect(getVirtualItems(generatedArray, 10, 1)).toEqual([
        { index: 9 },
        { index: 10 },
        { index: 11 },
      ]);
    });

    it('returns single item with buffer 0', () => {
      expect(getVirtualItems(generatedArray, 1, 0)).toEqual([{ index: 1 }]);
    });
  });
});
