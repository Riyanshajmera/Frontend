import React, { createContext, useEffect, useState } from 'react';
import { authApi } from '../api/auth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }); // { username, role, ... }
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const me = await authApi.me();
      if (!mounted) return;
      if (me.success) {
        // Prefer existing role from localStorage if /auth/user/ lacks it
        const existingRole = (user?.role || '').toUpperCase();
        const normalized = {
          ...me.data,
          role: ((me.data?.role || existingRole) || '').toUpperCase()
        };
        try { localStorage.setItem('auth_user', JSON.stringify(normalized)); } catch {}
        setUser(normalized);
      } else {
        try { localStorage.removeItem('auth_user'); } catch {}
        setUser(null);
      }
      setLoadingUser(false);
    })();
    return () => { mounted = false; };
  }, []);

  // Persist user on change
  useEffect(() => {
    try {
      if (user) localStorage.setItem('auth_user', JSON.stringify(user));
      else localStorage.removeItem('auth_user');
    } catch {}
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};
