import { type FC, useMemo } from 'react';
import {
  ChatCircleIcon,
  HandsClappingIcon,
  IconContext,
  type IconProps,
  PauseIcon,
  PlayIcon,
  ShareFatIcon,
  SpeakerSimpleHighIcon,
  SpeakerSimpleXIcon,
} from '@phosphor-icons/react';
import styled from 'styled-components';
import { media, rem } from '../../../styles/utils.ts';

type ActionName = 'like' | 'comment' | 'share';
type ActionProps = {
  count?: number;
  onClick?: () => void;
};

const ACTION_ICON_MAP: Record<ActionName, FC<IconProps>> = {
  like: HandsClappingIcon,
  comment: ChatCircleIcon,
  share: ShareFatIcon,
};

export type MomentToolbarProps = {
  user: {
    username: string;
    avatarImageUrl: string;
    avatarBgColor: string;
    url: string;
  };
  socialActions: Record<ActionName, ActionProps>;
  playbackToggle: {
    isPaused: boolean;
    onClick?: () => void;
  };
  muteToggle: {
    isMuted: boolean;
    onClick?: () => void;
  };
};

export const MomentToolbar = ({
  user,
  socialActions,
  playbackToggle,
  muteToggle,
}: MomentToolbarProps) => {
  const actionEntries = useMemo(() => Object.entries(socialActions), [socialActions]);

  return (
    <Container>
      <UserContainer href={`/${user.username}`}>
        <UserAvatarImage src={user.avatarImageUrl} alt={user.username} />
        <UserName>{user.username}</UserName>
      </UserContainer>
      <IconContext.Provider
        value={{
          size: '1.5em',
          weight: 'fill',
        }}>
        <ButtonsContainer>
          {actionEntries.map(([actionName, { count, onClick }]) => {
            const IconComponent = ACTION_ICON_MAP[actionName as ActionName];

            return (
              <IconButton key={actionName} onClick={onClick}>
                <IconComponent />
                {count}
              </IconButton>
            );
          })}
          <IconButton onClick={playbackToggle.onClick}>
            {playbackToggle.isPaused ? <PlayIcon /> : <PauseIcon />}
          </IconButton>
          <IconButton onClick={muteToggle.onClick}>
            {muteToggle.isMuted ? <SpeakerSimpleXIcon /> : <SpeakerSimpleHighIcon />}
          </IconButton>
        </ButtonsContainer>
      </IconContext.Provider>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${rem(12)} 0;
  user-select: none;
  z-index: 30;
`;

const UserContainer = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: ${rem(8)};
  max-width: 30%;
  width: auto;

  ${media.sm} {
    max-width: initial;
  }
`;

const UserAvatarImage = styled.img`
  width: ${rem(20)};
  aspect-ratio: 1 / 1;
  border-radius: 50%;

  ${media.sm} {
    width: ${rem(24)};
  }
`;

const UserName = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: ${rem(14)};
  font-weight: 600;
  color: #fff;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${rem(12)};
  font-size: ${rem(14)};

  ${media.sm} {
    font-size: ${rem(16)};
    gap: ${rem(16)};
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${rem(8)};
  font-weight: 600;
  color: #fff;
  transition: transform 200ms ease-in;

  &:hover {
    transform: scale(1.1);
  }
`;
