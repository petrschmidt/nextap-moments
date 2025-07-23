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
import {
  MomentButtonsContainer,
  MomentContainer,
  MomentIconButton,
  MomentUserAvatarImage,
  MomentUserContainer,
  MomentUserName,
} from './styles.tsx';

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

/**
 * Toolbar displays user avatar and name, social actions and playback/mute controls.
 */
export const MomentToolbar = ({
  user,
  socialActions,
  playbackToggle,
  muteToggle,
}: MomentToolbarProps) => {
  const actionEntries = useMemo(() => Object.entries(socialActions), [socialActions]);

  return (
    <MomentContainer>
      <MomentUserContainer href={`/${user.username}`}>
        <MomentUserAvatarImage src={user.avatarImageUrl} alt={user.username} />
        <MomentUserName>{user.username}</MomentUserName>
      </MomentUserContainer>
      <IconContext.Provider
        value={{
          size: '1.5em',
          weight: 'fill',
        }}>
        <MomentButtonsContainer>
          {actionEntries.map(([actionName, { count, onClick }]) => {
            const IconComponent = ACTION_ICON_MAP[actionName as ActionName];

            return (
              <MomentIconButton key={actionName} onClick={onClick} data-test={actionName}>
                <IconComponent />
                {count}
              </MomentIconButton>
            );
          })}
          <MomentIconButton
            onClick={playbackToggle.onClick}
            data-test={playbackToggle.isPaused ? 'play-button' : 'pause-button'}>
            {playbackToggle.isPaused ? <PlayIcon /> : <PauseIcon />}
          </MomentIconButton>
          <MomentIconButton
            onClick={muteToggle.onClick}
            data-test={muteToggle.isMuted ? 'muted-button' : 'unmuted-button'}>
            {muteToggle.isMuted ? <SpeakerSimpleXIcon /> : <SpeakerSimpleHighIcon />}
          </MomentIconButton>
        </MomentButtonsContainer>
      </IconContext.Provider>
    </MomentContainer>
  );
};
