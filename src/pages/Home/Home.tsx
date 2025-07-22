import styled from 'styled-components';
import { Moment } from '../../components/Moment/Moment.tsx';
import type { Moment as MomentType } from '../../types/api/moment';
import {
  useGetUserMoments,
  type UseGetUserMomentsResponse,
} from '../../hooks/api/useGetUserMoments.ts';
import { useRef, useState } from 'react';

const PAGE_SIZE = 3;
const VIRTUAL_ITEMS_BUFFER = 1;

export default function Home() {
  const { data, isLoading, fetchNextPage } = useGetUserMoments(undefined, { limit: PAGE_SIZE });
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextMomentRef = useRef<HTMLElement>(null);

  const initialItems = data?.pages.reduce(
    (prev, { data }) => [...prev, ...data],
    [] as MomentType[]
  );
  const virtualItems: MomentType[] =
    initialItems?.reduce(
      (prev, item, index) => {
        if (
          index <= currentIndex + VIRTUAL_ITEMS_BUFFER &&
          index >= currentIndex - VIRTUAL_ITEMS_BUFFER
        ) {
          return [...prev, item];
        }
        return prev;
      },
      [] as UseGetUserMomentsResponse['data']
    ) ?? [];

  const onCurrentMomentEnded = () => {
    nextMomentRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <MomentWrapper>
      {isLoading && <>Loading...</>}

      <MomentPlaceholder style={{ '--placeholder-multiplier': currentIndex - 1 }} />
      {virtualItems.map((item) => {
        const realIndex = initialItems?.findIndex(({ id }) => id === item.id);
        const isNext = realIndex === currentIndex + 1;
        const isLast = initialItems ? realIndex === initialItems.length - 1 : true;

        const onVisible = () => {
          if (realIndex !== undefined) {
            setCurrentIndex(realIndex);

            if (realIndex === initialItems.length - 2) {
              void fetchNextPage();
            }
          }
        };

        return (
          <Moment
            key={item.id}
            ref={isNext ? nextMomentRef : undefined}
            moment={item}
            loop={isLast}
            onVisible={onVisible}
            onEnded={onCurrentMomentEnded}
          />
        );
      })}
    </MomentWrapper>
  );
}

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
