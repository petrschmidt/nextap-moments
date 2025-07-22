import { type ReactNode, useEffect, useMemo, useState } from 'react';
import {
  USER_PREFERENCES_DEFAULT_STATE,
  UserPreferencesContext,
  type UserPreferencesContextActions,
  type UserPreferencesContextState,
} from './context';
import { LocalStorageKey } from '../../types';

const storage = {
  get preferences(): UserPreferencesContextState | undefined {
    try {
      const preferences = localStorage.getItem(LocalStorageKey.UserPreferences);
      if (preferences) {
        return JSON.parse(preferences);
      }
      return;
    } catch (error) {
      console.error('Error while parsing user preferences: ', error);
    }
  },
  set preferences(value: UserPreferencesContextState) {
    try {
      localStorage.setItem(LocalStorageKey.UserPreferences, JSON.stringify(value));
    } catch (error) {
      console.error('Error while saving user preferences: ', error);
    }
  },
};

export const UserPreferencesProvider = ({ children }: { children?: ReactNode }) => {
  const [preferences, setPreferences] = useState<UserPreferencesContextState>(() => ({
    ...USER_PREFERENCES_DEFAULT_STATE,
    ...storage.preferences,
  }));

  const actions = useMemo<UserPreferencesContextActions>(
    () => ({
      setMuted: (muted) => setPreferences((prev) => ({ ...prev, muted })),
    }),
    []
  );

  useEffect(() => {
    storage.preferences = preferences;
  }, [preferences]);

  return (
    <UserPreferencesContext.Provider value={{ ...preferences, ...actions }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
