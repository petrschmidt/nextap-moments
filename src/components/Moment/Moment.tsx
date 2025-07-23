import { MomentToolbar } from './MomentToolbar/MomentToolbar.tsx';
import { forwardRef, useEffect, useRef, useState } from 'react';
import type { Moment as MomentType } from '../../types';
import { MomentProgress } from './MomentProgress/MomentProgress.tsx';
import {
  MomentCard,
  MomentCardOverlay,
  MomentContainer,
  MomentContainerInner,
  MomentImage,
  MomentStyledBlurhash,
  MomentTitle,
  MomentVideo,
  MomentVideoPlayOverlay,
  MomentVideoPlayOverlayIconWrapper,
} from './styles.tsx';
import { PlayIcon } from '@phosphor-icons/react';
import { MomentVideoSourceSet } from './MomentVideoSourceSet/MomentVideoSourceSet.tsx';
import { MomentImageSourceSet } from './MomentImageSourceSet/MomentImageSourceSet.tsx';
import { useUserPreferences } from '../../providers';
import { MomentDescription } from './MomentDescription/MomentDescription.tsx';

// Default moment duration when no video is provided (i.e. image-only moment)
const MOMENT_DEFAULT_DURATION = 8000;

export type MomentProps = {
  moment: MomentType;
  loop?: boolean;
  onVisible?: () => void;
  onEnded?: () => void;
};

export const Moment = forwardRef<HTMLElement, MomentProps>(
  ({ moment, loop, onVisible, onEnded }, containerRef) => {
    const playerContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [isVisible, setIsVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const { muted, setMuted } = useUserPreferences();

    const duration = moment.video_files?.duration ?? MOMENT_DEFAULT_DURATION;
    const isImageOnly = !moment.video_files;
    const imageUrl = moment.image_files.variants.find(
      ({ variant }) => variant === 'webp_medium'
    )?.url;

    const togglePlayback = () => setIsPlaying((prev) => !prev);
    // Resets media (video/audio) to beginning
    const resetMedia = () => {
      if (videoRef.current) videoRef.current.currentTime = 0;
      if (audioRef.current) audioRef.current.currentTime = 0;
    };

    useEffect(() => {
      // This intersection observer fires only when the current moment comes into or out of the view
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
          setIsPlaying(entry.isIntersecting);

          if (entry.isIntersecting) {
            // When in view, call back to parent component - mainly for virtualization and paging purposes
            onVisible?.();
          } else {
            // When out of the view, reset the progress of media
            resetMedia();
          }
        },
        // We want the Moment to activate only after at least 50% of it is visible
        { threshold: 0.5, rootMargin: '0px' }
      );
      if (playerContainerRef.current) {
        observer.observe(playerContainerRef.current);
      }

      return () => observer.disconnect();
    }, [onVisible]);

    /**
     * This `useEffect` runs every time the `isPlaying` state changes in order to control
     * the playback of the respective media.
     */
    useEffect(() => {
      const video = videoRef.current;
      const audio = audioRef.current;
      let imageTimout: number;

      const onEndedHandler = () => {
        setIsPlaying(false);
        onEnded?.();
      };

      const startImageTimeout = () => {
        imageTimout = setTimeout(onEndedHandler, MOMENT_DEFAULT_DURATION);
      };
      const clearImageTimeout = () => {
        clearTimeout(imageTimout);
      };

      // For better readability
      const shouldPlay = isPlaying;

      if (video) {
        if (shouldPlay) {
          // When `video` is available and is not playing => play
          video
            .play()
            .then(() => audio?.play())
            .catch(() => setIsPlaying(false));
          video.addEventListener('ended', onEndedHandler);
        } else {
          // When `video` is available and is playing => pause
          video.pause();
          audio?.pause();
          video.removeEventListener('ended', onEndedHandler);
        }
      }

      if (isImageOnly) {
        if (shouldPlay) {
          // When only image is available (no video) and provided audio is not playing => play
          audio?.play();
          startImageTimeout();
        } else {
          // When only image is available (no video) and provided audio is playing => pause
          audio?.pause();
          clearImageTimeout();
        }
      }

      return () => {
        video?.removeEventListener('ended', onEndedHandler);
        clearImageTimeout();
      };
    }, [isPlaying, isImageOnly, onEnded]);

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

            {moment.video_files ? (
              <MomentVideo
                ref={videoRef}
                preload="auto"
                poster={imageUrl}
                playsInline
                loop={loop}
                muted={muted}>
                <MomentVideoSourceSet variants={moment.video_files.variants} />
              </MomentVideo>
            ) : (
              <MomentImage>
                <MomentImageSourceSet variants={moment.image_files.variants} />
              </MomentImage>
            )}
            {moment.soundtrack && (
              <audio
                ref={audioRef}
                src={moment.soundtrack.src}
                playsInline
                loop={loop}
                muted={muted}
              />
            )}

            <MomentCardOverlay>
              <MomentVideoPlayOverlay onClick={togglePlayback} $hidden={isPlaying}>
                <MomentVideoPlayOverlayIconWrapper>
                  <PlayIcon weight="fill" size={32} />
                </MomentVideoPlayOverlayIconWrapper>
              </MomentVideoPlayOverlay>

              <div>
                <MomentProgress
                  running={isPlaying}
                  visibleInViewport={isVisible}
                  durationMs={duration}
                />
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
                    isMuted: muted,
                    onClick: () => setMuted(!muted),
                  }}
                />
              </div>
              <MomentDescription
                location={{
                  name: moment.geo_pin.name,
                  url: `/location`,
                }}
                description={moment.description?.text}
                views={moment.view_count}
              />
            </MomentCardOverlay>
          </MomentCard>
        </MomentContainerInner>
      </MomentContainer>
    );
  }
);
