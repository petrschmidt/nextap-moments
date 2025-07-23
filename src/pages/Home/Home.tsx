import styled from 'styled-components';
import { Moment } from '../../components/Moment/Moment.tsx';
import type { Moment as MomentType } from '../../types/api/moment';
import { useGetUserMoments } from '../../hooks/api/useGetUserMoments.ts';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useVirtualItems } from '../../hooks/useVirtualItems.ts';
import { rem } from '../../styles/utils.ts';

const PAGE_SIZE = 3;
const VIRTUAL_ITEMS_BUFFER = 1;

export default function Home() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUserMoments(
    undefined,
    {
      limit: PAGE_SIZE,
    }
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextMomentRef = useRef<HTMLElement>(null);

  // Flatten pages into single array of MomentType
  const initialItems = useMemo(
    () => data?.pages.reduce((prev, { data }) => [...prev, ...data], [] as MomentType[]),
    [data]
  );
  const virtualItems = useVirtualItems({
    initialItems,
    currentIndex,
    buffer: VIRTUAL_ITEMS_BUFFER,
  });

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

  const onCurrentMomentEnded = () => {
    nextMomentRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const memoizedMoments = useMemo(
    () =>
      virtualItems.map((item) => {
        const realIndex = initialItems?.findIndex(({ id }) => id === item.id);
        const isNext = realIndex === currentIndex + 1;
        const isLast = initialItems ? realIndex === initialItems.length - 1 : true;

        const handleVisible = () => {
          if (realIndex) onVisible(realIndex as number);
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
      <MomentPlaceholder style={{ '--placeholder-multiplier': currentIndex - 1 }} />
      {memoizedMoments}
    </MomentWrapper>
  );
}

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const MomentPlaceholder = styled.div`
  height: calc(100dvh * var(--placeholder-multiplier));
`;
