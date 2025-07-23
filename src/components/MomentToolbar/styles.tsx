import styled from 'styled-components';
import { media, rem } from '../../styles';

export const MomentContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${({ theme }) => theme.space.md} 0;
  user-select: none;
  z-index: ${({ theme }) => theme.zIndex.moment.description};
  overflow: hidden;
`;

export const MomentUserContainer = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: ${({ theme }) => theme.space.sm};
  max-width: 30%;
  width: auto;

  ${media.sm} {
    max-width: initial;
  }
`;

export const MomentUserAvatarImage = styled.img`
  width: ${rem(20)};
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.radii.full};

  ${media.sm} {
    width: ${rem(32)};
  }
`;

export const MomentUserName = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground.primary};

  ${media.sm} {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

export const MomentButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  ${media.sm} {
    font-size: ${({ theme }) => theme.fontSizes.base};
    gap: ${({ theme }) => theme.space.xl};
  }
  ${media.xl} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    gap: ${({ theme }) => theme.space.xl};
  }
`;

export const MomentIconButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground.primary};
  transition: transform ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: scale(1.1);
  }
`;
