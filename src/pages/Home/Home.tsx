import styled from 'styled-components';
import { Moment } from '../../components/Moment/Moment.tsx';
import {
  useGetUserMoments,
  type UseGetUserMomentsResponse,
} from '../../hooks/api/useGetUserMoments.ts';
import { useRef, useState } from 'react';

const PAGE_SIZE = 2;
const VIRTUAL_ITEMS_BUFFER = 1;

export default function Home() {
  const { data, isLoading } = useGetUserMoments(undefined, { limit: PAGE_SIZE });
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextMomentRef = useRef<HTMLElement>(null);

  const initialItems = data?.data;
  const virtualItems: UseGetUserMomentsResponse['data'] =
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

  console.log(currentIndex);

  return (
    <MomentWrapper>
      {isLoading && <>Loading...</>}

      <MomentPlaceholder style={{ '--placeholder-multiplier': currentIndex - 1 }} />
      {virtualItems.map((item) => {
        const realIndex = initialItems?.findIndex(({ id }) => id === item.id);
        const isNext = realIndex === currentIndex + 1;
        const isLast = initialItems ? realIndex === initialItems.length - 1 : true;

        return (
          <Moment
            key={item.id}
            ref={isNext ? nextMomentRef : undefined}
            moment={item}
            loop={isLast}
            onVisible={realIndex !== undefined ? () => setCurrentIndex(realIndex) : undefined}
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
