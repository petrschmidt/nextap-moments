import { MomentToolbar } from './MomentToolbar/MomentToolbar.tsx';
import styled from 'styled-components';
import { rem } from '../../styles/utils.ts';
import { useEffect, useRef, useState } from 'react';

export type MomentProps = {
  user: {
    name: string;
    url: string;
    avatarImageUrl: string;
  };
  onVisible?: () => void;
};

export const Moment = ({ user, onVisible }: MomentProps) => {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          onVisible?.();
        }
      },
      { threshold: 0.5, rootMargin: '0px' }
    );
    if (playerContainerRef.current) {
      observer.observe(playerContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Container>
      <ContainerInner>
        <Title $isVisible={isVisible}>Moment by {user.name}</Title>
        <Card ref={playerContainerRef} $isVisible={isVisible}>
          <MomentToolbar author={{ name: 'johndoe', imageUrl: '', url: '' }} />
        </Card>
      </ContainerInner>
    </Container>
  );
};

const Container = styled.article`
  display: flex;
  justify-content: center;
  flex: 1;
  scroll-snap-align: center;

  --container-padding: ${rem(16)};
  --container-gap: ${rem(16)};
  --title-font-size: ${rem(22)};
`;

const ContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100dvh;
  padding: var(--container-padding);
  gap: var(--container-gap);
`;

const Title = styled.div<{ $isVisible: boolean }>`
  width: min(100%, calc(100dvh * 9 / 16 - ${rem(80)}));
  font-size: var(--title-font-size);
  font-weight: 900;
  flex-shrink: 0;
  transform: translate3d(0, ${(p) => (p.$isVisible ? '0' : '150%')}, 0);
  transition: transform 0.5s ease-in-out;
`;

const Card = styled.div<{ $isVisible: boolean }>`
  width: min(100%, calc(100dvh * 9 / 16 - ${rem(80)}));
  height: min(100%, calc(100dvw * 16 / 9 - var(--container-padding) * 2));
  aspect-ratio: 9 / 16;
  border-radius: ${rem(12)};
  background-color: ${(p) => (p.$isVisible ? 'green' : 'lightblue')};
  filter: drop-shadow(rgba(0, 0, 0, 0.25) 2px 4px 6px);

  // transform: translate3d(0, ${(p) => (p.$isVisible ? '0' : '-5%')}, 0);
  // transition: transform 0.25s ease-in-out;
  transition: background-color 0.5s ease-in-out;
`;
