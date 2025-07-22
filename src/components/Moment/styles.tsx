import styled, { css } from 'styled-components';
import { media, rem } from '../../styles/utils.ts';
import { Blurhash } from 'react-blurhash';

export const MomentContainer = styled.article`
  display: flex;
  justify-content: center;
  flex: 1;
  scroll-snap-align: center;

  --container-padding: ${rem(16)};
  --container-gap: ${rem(16)};
  --title-font-size: ${rem(22)};
`;

export const MomentContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100dvh;
  padding: var(--container-padding);
  gap: var(--container-gap);
`;

export const MomentTitle = styled.div<{ $isVisible: boolean }>`
  display: none;
  width: min(100%, calc(100dvh * 9 / 16 - ${rem(80)}));
  font-size: var(--title-font-size);
  font-weight: 600;
  flex-shrink: 0;
  transform: translate3d(0, ${(p) => (p.$isVisible ? '0' : '150%')}, 0);
  transition: transform 0.5s ease-in-out;

  ${media.sm} {
    display: block;
  }
`;

export const MomentCard = styled.div<{ $isVisible: boolean; $backgroundColor: string }>`
  position: relative;
  height: min(100%, calc(100dvw * 16 / 9 - var(--container-padding) * 2));
  aspect-ratio: 9 / 16;
  border-radius: ${rem(12)};
  background-color: ${(p) => p.$backgroundColor};
  filter: drop-shadow(rgba(0, 0, 0, 0.25) 2px 4px 6px);
  overflow: hidden;
`;

export const MomentCardOverlay = styled.div`
  position: absolute;
  padding: ${rem(12)};
  inset: 0;
  z-index: 20;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 30%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0.1) 100%
  );
`;

export const MomentMedia = css`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: 10;
`;

export const MomentVideo = styled.video`
  ${MomentMedia}
`;
export const MomentImage = styled.picture`
  ${MomentMedia}

  img {
    width: 100%;
  }
`;

export const MomentStyledBlurhash = styled(Blurhash)`
  position: absolute;
  inset: 0;
  z-index: 1;
`;

export const MomentVideoPlayOverlay = styled.div<{ $hidden: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(p) => (p.$hidden ? '0' : '1')};
  transition: opacity 100ms ease-in;
`;

export const MomentVideoPlayOverlayIconWrapper = styled.button`
  width: ${rem(64)};
  height: ${rem(64)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: rgba(124, 125, 133, 0.5);
  opacity: 0.9;
  color: #fff;
`;
