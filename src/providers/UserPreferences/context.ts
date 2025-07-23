import { createContext, useContext } from 'react';

export type UserPreferencesContextType = UserPreferencesContextActions &
  UserPreferencesContextState;

export type UserPreferencesContextActions = {
  setMuted: (muted: boolean) => void;
};

export type UserPreferencesContextState = {
  muted: boolean;
};

export const USER_PREFERENCES_DEFAULT_STATE: UserPreferencesContextState = {
  muted: true,
};

/**
 * Context used for storing and retrieving user preferences (e.g. muted)
 */
export const UserPreferencesContext = createContext<UserPreferencesContextType>({
  ...USER_PREFERENCES_DEFAULT_STATE,
  setMuted: () => {},
});

/**
 * Helper hook for accessing user preferences (e.g. muted)
 */
export const useUserPreferences = () => useContext(UserPreferencesContext);
