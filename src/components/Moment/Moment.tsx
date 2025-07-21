import { MomentToolbar } from './MomentToolbar/MomentToolbar.tsx';
import styled from 'styled-components';
import { rem } from '../../styles/utils.ts';
import { forwardRef, useEffect, useRef, useState } from 'react';
import type { Moment as MomentType } from '../../types';
import { Blurhash } from 'react-blurhash';
import { MomentProgress, type MomentProgressRef } from './MomentProgress/MomentProgress.tsx';
import { selectVideoVariant } from '../../utils';

export type MomentProps = {
  moment: MomentType;
  onVisible?: () => void;
  onEnded?: () => void;
};

export const Moment = forwardRef<HTMLElement, MomentProps>(
  ({ moment: { user, image_files, video_files }, onVisible, onEnded }, containerRef) => {
    const playerContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<MomentProgressRef>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

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
    }, [onVisible]);

    useEffect(() => {
      const video = videoRef.current;

      if (video) {
        if (isVisible) {
          video.play().then(() => setIsPlaying(true));
        } else {
          video.pause();
          setIsPlaying(false);
        }
      }
    }, [isVisible]);

    useEffect(() => {
      const video = videoRef.current;

      const handler = () => {
        if (progressRef.current && video && video.duration > 0) {
          const progress = video.currentTime / video.duration;
          progressRef?.current.updateProgress(progress, video.duration);
        }
      };

      if (video) {
        if (isPlaying) {
          video.addEventListener('timeupdate', handler);
        } else {
          video.removeEventListener('timeupdate', handler);
        }
      }
      return () => {
        video?.removeEventListener('timeupdate', handler);
      };
    }, [isPlaying]);

    useEffect(() => {
      const video = videoRef.current;

      const handler = () => {
        setIsPlaying(false);
        onEnded?.();
      };
      video?.addEventListener('ended', handler);

      return () => {
        video?.removeEventListener('ended', handler);
      };
    }, [onEnded]);

    return (
      <Container ref={containerRef}>
        <ContainerInner>
          <Title $isVisible={isVisible}>Moment by {user.username}</Title>
          <Card
            ref={playerContainerRef}
            $isVisible={isVisible}
            $backgroundColor={image_files.background_color}>
            <StyledBlurhash hash={image_files.background_hash} width="100%" height="100%" />
            <Video
              ref={videoRef}
              width="100%"
              height="100%"
              preload="auto"
              src={selectVideoVariant(video_files.variants).url}
              muted
            />

            <CardOverlay>
              <MomentProgress ref={progressRef} />
              <MomentToolbar author={{ name: 'johndoe', imageUrl: '', url: '' }} />
            </CardOverlay>
          </Card>
        </ContainerInner>
      </Container>
    );
  }
);

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

const Card = styled.div<{ $isVisible: boolean; $backgroundColor: string }>`
  position: relative;
  height: min(100%, calc(100dvw * 16 / 9 - var(--container-padding) * 2));
  aspect-ratio: 9 / 16;
  border-radius: ${rem(12)};
  background-color: ${(p) => p.$backgroundColor};
  filter: drop-shadow(rgba(0, 0, 0, 0.25) 2px 4px 6px);
  overflow: hidden;
`;

const CardOverlay = styled.div`
  position: absolute;
  padding: ${rem(12)};
  inset: 0;
  z-index: 20;
`;

const Video = styled.video`
  position: absolute;
  inset: 0;
  z-index: 10;
`;

const StyledBlurhash = styled(Blurhash)`
  position: absolute;
  inset: 0;
  z-index: 1;
`;
