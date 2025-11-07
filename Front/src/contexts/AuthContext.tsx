import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/auth';

type User = {
  id: string;
  email: string;
  role: string;
};

type AuthContextValue = {
  accessToken: string | null;
  user: User | null;
  status: 'idle' | 'loading' | 'ready' | 'error';
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_TOKEN_KEY = 'poly-oil-hr:accessToken';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem(STORAGE_TOKEN_KEY));
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthContextValue['status']>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function bootstrap() {
      if (!accessToken) {
        setStatus('ready');
        return;
      }
      try {
        setStatus('loading');
        const profile = await authService.fetchProfile(accessToken);
        setUser(profile);
        setStatus('ready');
      } catch (err) {
        console.error('Failed to load profile', err);
        localStorage.removeItem(STORAGE_TOKEN_KEY);
        setAccessToken(null);
        setStatus('ready');
      }
    }
    void bootstrap();
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(STORAGE_TOKEN_KEY, accessToken);
    } else {
      localStorage.removeItem(STORAGE_TOKEN_KEY);
    }
  }, [accessToken]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setStatus('loading');
      setError(null);
      const response = await authService.login(email, password);
      setAccessToken(response.accessToken);
      setUser(response.user);
      setStatus('ready');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Impossible de se connecter');
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn('Logout failed', err);
    } finally {
      setAccessToken(null);
      setUser(null);
      setStatus('ready');
    }
  }, []);

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await authService.refresh();
      setAccessToken(response.accessToken);
      return response.accessToken;
    } catch (err) {
      console.error('Refresh token failed', err);
      await logout();
      return null;
    }
  }, [logout]);

  const value = useMemo(
    () => ({ accessToken, user, status, error, login, logout, refreshAccessToken }),
    [accessToken, user, status, error, login, logout, refreshAccessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

