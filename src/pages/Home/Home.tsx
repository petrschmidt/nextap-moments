import styled from 'styled-components';
import { Hero } from '../../components/Hero/Hero.tsx';
import { Moment } from '../../components/Moment/Moment.tsx';
import {
  useGetUserMoments,
  type UseGetUserMomentsResponse,
} from '../../hooks/api/useGetUserMoments.ts';
import { useRef, useState } from 'react';

const VIRTUAL_ITEMS_BUFFER = 1;

export default function Home() {
  const { data, isLoading } = useGetUserMoments();
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

  return (
    <>
      {/*<Hero />*/}
      <MomentWrapper>
        {isLoading && <>Loading...</>}

        <MomentPlaceholder style={{ '--placeholder-multiplier': currentIndex - 1 }} />
        {virtualItems.map((item) => {
          const realIndex = initialItems?.findIndex(({ id }) => id === item.id);

          return (
            <Moment
              key={item.id}
              ref={realIndex === currentIndex + 1 ? nextMomentRef : undefined}
              moment={item}
              onVisible={realIndex ? () => setCurrentIndex(realIndex) : undefined}
              onEnded={onCurrentMomentEnded}
            />
          );
        })}
      </MomentWrapper>
    </>
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
