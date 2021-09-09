import { useState, useCallback } from 'react';

interface IUser {
  username?: string;
  token?: string;
  isLogin?: boolean;
}

export default function useAuthModel() {
  //页面刷新查看本地session
  const user0Str = sessionStorage.getItem('user');
  let user0 = {};
  if (user0Str) {
    user0 = JSON.parse(user0Str);
  }
  const [user, setUser] = useState<IUser>(user0);

  //用户登录
  const login = useCallback((username, token) => {
    user0 = {
      username: username,
      token: token,
      isLogin: true,
    };
    setUser(user0);
    sessionStorage.setItem('user', JSON.stringify(user0));
  }, []);

  //用户退出
  const logout = useCallback(() => {
    console.log('logout');
    user0 = {
      isLogin: false,
    };
    setUser(user0);
    sessionStorage.setItem('user', JSON.stringify(user0));
  }, []);

  return {
    user,
    login,
    logout,
  };
}
