import styled from 'styled-components';
import { Moment } from '../../components/Moment/Moment.tsx';
import type { Moment as MomentType } from '../../types/api/moment';
import { useGetUserMoments } from '../../hooks/api/useGetUserMoments.ts';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useVirtualItems } from '../../hooks/useVirtualItems.ts';
import { rem } from '../../styles';
import { flexCenter } from '../../styles/mixins.ts';

const PAGE_SIZE = 3;
const VIRTUAL_ITEMS_BUFFER = 1;

export default function Home() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUserMoments(
    undefined,
    {
      limit: PAGE_SIZE,
    }
  );
  // Index of the currently visible (playing) Moment
  const [currentIndex, setCurrentIndex] = useState(0);
  // Reference to the next Moment after the current one
  const nextMomentRef = useRef<HTMLElement>(null);

  // Flatten pages into single array of MomentType
  const initialItems = useMemo(
    () => data?.pages.reduce((prev, { data }) => [...prev, ...data], [] as MomentType[]),
    [data]
  );
  // Virtual items to be rendered
  const virtualItems = useVirtualItems({
    initialItems,
    currentIndex,
    buffer: VIRTUAL_ITEMS_BUFFER,
  });

  // Callback that fires when a Moment comes into view
  const onVisible = useCallback(
    (realIndex: number) => {
      setCurrentIndex(realIndex);
      const isSecondLast = initialItems?.length ? realIndex === initialItems.length - 2 : false;

      if (hasNextPage && !isFetchingNextPage && isSecondLast) {
        void fetchNextPage();
      }
    },
    [initialItems?.length, fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  // Callback that fires when current Moment finished playing (to the end), so the next one can continue
  const onCurrentMomentEnded = () => {
    nextMomentRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const memoizedMoments = useMemo(
    () =>
      virtualItems.map((item) => {
        // Index of the item in the complete array of items (outside virtualization)
        const realIndex = initialItems?.findIndex(({ id }) => id === item.id);
        const isNext = realIndex === currentIndex + 1;
        const isLast = initialItems ? realIndex === initialItems.length - 1 : true;

        const handleVisible = () => {
          if (realIndex !== undefined) onVisible(realIndex as number);
        };

        return (
          <Moment
            key={item.id}
            ref={isNext ? nextMomentRef : undefined}
            moment={item}
            loop={isLast}
            onVisible={handleVisible}
            onEnded={onCurrentMomentEnded}
          />
        );
      }),
    [currentIndex, initialItems, onVisible, virtualItems]
  );

  if (isLoading) {
    return <LoadingWrapper>Loading</LoadingWrapper>;
  }

  return (
    <MomentWrapper>
      <MomentPlaceholder $multiplier={currentIndex - 1} />
      {memoizedMoments}
    </MomentWrapper>
  );
}

const LoadingWrapper = styled.div`
  ${flexCenter};
  height: 100dvh;
  font-size: ${rem(48)};
  font-weight: 600;
`;

const MomentWrapper = styled.div`
  width: 100%;
  height: 100dvh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/**
 * Special component needed for virtualization.
 * It fills the space before the current virtualized items for smooth scrolling/flowing experience.
 */
const MomentPlaceholder = styled.div<{ $multiplier: number }>`
  height: calc(100dvh * ${(p) => p.$multiplier});
`;
