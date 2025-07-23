import styled, { css } from 'styled-components';
import { media, rem } from '../../styles/utils.ts';
import { flexCenter } from '../../styles/mixins.ts';
import { Blurhash } from 'react-blurhash';

/**
 * Moment's main components (extracted to separate file for better readibility)
 */

export const MomentContainer = styled.article`
  display: flex;
  justify-content: center;
  flex: 1;
  scroll-snap-align: center;

  --container-padding: ${({ theme }) => theme.space.lg};
`;

export const MomentContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100dvh;
  padding: var(--container-padding);
  gap: ${({ theme }) => theme.space.lg};
`;

export const MomentTitle = styled.div<{ $isVisible: boolean }>`
  display: none;
  width: min(100%, calc(100dvh * 9 / 16 - ${rem(80)}));
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  flex-shrink: 0;
  transform: translate3d(0, ${(p) => (p.$isVisible ? '0' : '150%')}, 0);
  transition: transform ${({ theme }) => theme.transitions.slow};

  ${media.sm} {
    display: block;
  }
`;

export const MomentCard = styled.div<{ $isVisible: boolean; $backgroundColor: string }>`
  position: relative;
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  height: min(100%, calc(100dvw * 16 / 9 - var(--container-padding) * 2));
  aspect-ratio: 9 / 16;
  border-radius: ${({ theme }) => theme.radii.xl};
  background-color: ${(p) => p.$backgroundColor};
  filter: drop-shadow(rgba(0, 0, 0, 0.25) 2px 4px 6px);
  overflow: hidden;
`;

export const MomentStyledBlurhash = styled(Blurhash)`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.moment.background};
`;

export const MomentMedia = css`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.moment.media};
`;

export const MomentCardOverlay = styled.div`
  position: absolute;
  padding: ${({ theme }) => theme.space.md};
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 10%, rgba(0, 0, 0, 0) 40%),
    linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.35) 17%, rgba(0, 0, 0, 0) 40%);
  z-index: ${({ theme }) => theme.zIndex.moment.overlay};
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

export const MomentVideoPlayOverlay = styled.div<{ $hidden: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 20;
  ${flexCenter};
  opacity: ${(p) => (p.$hidden ? '0' : '1')};
  transition: opacity ${({ theme }) => theme.transitions.fast};
`;

export const MomentVideoPlayOverlayIconWrapper = styled.button`
  width: ${rem(64)};
  height: ${rem(64)};
  ${flexCenter};
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: rgba(124, 125, 133, 0.5);
  opacity: 0.9;
  color: #fff;
  cursor: default;
`;
