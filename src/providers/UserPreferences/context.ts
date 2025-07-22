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
  muted: false,
};

export const UserPreferencesContext = createContext<UserPreferencesContextType>({
  ...USER_PREFERENCES_DEFAULT_STATE,
  setMuted: () => {},
});

export const useUserPreferences = () => useContext(UserPreferencesContext);
