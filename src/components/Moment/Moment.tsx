import { MomentToolbar } from './MomentToolbar/MomentToolbar.tsx';
import { forwardRef, useEffect, useRef, useState } from 'react';
import type { Moment as MomentType } from '../../types';
import { MomentProgress, type MomentProgressRef } from './MomentProgress/MomentProgress.tsx';
import { selectVideoVariant } from '../../utils';
import {
  MomentCard,
  MomentCardOverlay,
  MomentContainer,
  MomentContainerInner,
  MomentStyledBlurhash,
  MomentTitle,
  MomentVideo,
  MomentVideoPlayOverlay,
  MomentVideoPlayOverlayIconWrapper,
} from './styles.tsx';
import { PlayIcon } from '@phosphor-icons/react';

export type MomentProps = {
  moment: MomentType;
  onVisible?: () => void;
  onEnded?: () => void;
};

export const Moment = forwardRef<HTMLElement, MomentProps>(
  ({ moment, onVisible, onEnded }, containerRef) => {
    const playerContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<MomentProgressRef>(null);

    const [isVisible, setIsVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const togglePlayback = () => setIsPlaying((prev) => !prev);

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
          video.play();
          video.addEventListener('timeupdate', handler);
        } else {
          video.pause();
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
      <MomentContainer ref={containerRef}>
        <MomentContainerInner>
          <MomentTitle $isVisible={isVisible}>Moment by {moment.user.username}</MomentTitle>
          <MomentCard
            ref={playerContainerRef}
            $isVisible={isVisible}
            $backgroundColor={moment.image_files.background_color}>
            <MomentStyledBlurhash
              hash={moment.image_files.background_hash}
              width="100%"
              height="100%"
            />
            <MomentVideo
              ref={videoRef}
              width="100%"
              height="100%"
              preload="auto"
              src={selectVideoVariant(moment.video_files.variants).url}
              playsInline
              muted
            />

            <MomentCardOverlay>
              <MomentProgress ref={progressRef} />
              <MomentVideoPlayOverlay onClick={togglePlayback} $hidden={isPlaying}>
                <MomentVideoPlayOverlayIconWrapper>
                  <PlayIcon weight="fill" size={32} />
                </MomentVideoPlayOverlayIconWrapper>
              </MomentVideoPlayOverlay>
              <MomentToolbar
                user={{
                  username: moment.user._username,
                  avatarBgColor: moment.user.avatar_image_bg,
                  avatarImageUrl: moment.user.avatar_image_url,
                  url: '',
                }}
                socialActions={{
                  like: {
                    count: moment.clap_count,
                  },
                  comment: {
                    count: moment.comment_count,
                  },
                  share: {},
                }}
                playbackToggle={{
                  isPaused: !isPlaying,
                  onClick: togglePlayback,
                }}
                muteToggle={{
                  isMuted,
                  onClick: () => setIsMuted((prev) => !prev),
                }}
              />
            </MomentCardOverlay>
          </MomentCard>
        </MomentContainerInner>
      </MomentContainer>
    );
  }
);
