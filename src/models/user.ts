import { useState, useCallback } from 'react';

interface IUser {
  username?: string;
  token?: string;
  isLogin?: boolean;
}

export default function useAuthModel() {
  const [user, setUser] = useState<IUser>({});

  const login = useCallback((username, token) => {
    setUser({
      username: username,
      token: token,
      isLogin: true,
    });
  }, []);

  const logout = useCallback(() => {
    console.log('logout');
    setUser({
      isLogin: false,
    });
  }, []);

  return {
    user,
    login,
    logout,
  };
}
