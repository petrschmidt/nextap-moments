export type User = {
  id: string;
  revision: number;
  username: string;
  _username: string;
  display_name: string;
  header_image_url: string;
  header_image_bg: string;
  avatar_image_url: string;
  avatar_image_bg: string;
  followers: number;
  following: number;
  stories: number;
  moment_count: number;
  collection_count: number;
  private: boolean;
  blocked: boolean;
  follow_request_sent: boolean;
  follow_request_received: boolean;
  follows_you: boolean;
  explicitly_followed: boolean;
  implicitly_followed: boolean;
  attribution: {
    auth_user_metadata?: string;
  };
};
