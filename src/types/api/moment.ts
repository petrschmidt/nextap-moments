import type { User } from './user.ts';

export type MomentCenterOfInterest = {
  x: number;
  y: number;
};

export type MomentImageVariant =
  | 'original'
  | 'webp_w1080'
  | 'webp_high'
  | 'webp_w270'
  | 'webp_low'
  | 'w600'
  | 'w1080'
  | 'high'
  | 'webp_w540'
  | 'webp_medium'
  | 'w270'
  | 'low'
  | 'w540'
  | 'medium'
  | 'webp_w600';

export type MomentVideoVariant =
  | 'original'
  | 'w1080'
  | 'mp4'
  | 'h264_w1080'
  | 'h264_high'
  | 'h264_w896'
  | 'h264_medium'
  | 'h264_w270'
  | 'h264_low'
  | 'vp9_w1080'
  | 'vp9_high'
  | 'vp9_w270'
  | 'vp9_low'
  | 'vp9_w540'
  | 'vp9_medium';

type MomentFileItem<T extends 'image' | 'video'> = {
  id: string;
  background_color: string;
  background_hash: string;
  center_of_interest: MomentCenterOfInterest;
  duration: number;
  width: number;
  height: number;
  variants: {
    url: string;
    variant: T extends 'image' ? MomentImageVariant : MomentVideoVariant;
  }[];
  volume?: number;
};

export type MomentImageFiles = MomentFileItem<'image'>;
export type MomentVideoFiles = MomentFileItem<'video'> & {
  duration: number;
};

type Coords = {
  lat: number;
  lon: number;
};
export type MomentGeoPin = {
  name: string;
  location: Coords;
  viewport: {
    northeast: Coords;
    southwest: Coords;
  };
  place_id: string;
};

export type Moment = {
  id: string;
  view_count: number;
  clap_count: number;
  comment_count: number;
  description?: {
    text: string;
  };
  image_files: MomentImageFiles;
  video_files?: MomentVideoFiles;
  geo_pin: MomentGeoPin;
  soundtrack?: {
    song_id: string;
    start_time: number;
    src: string;
    volume: number;
  };
  user: User;
  share_url: string;
};
