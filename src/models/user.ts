import { useState, useCallback } from 'react';
import { useRequest } from 'umi';
import storage from '@/utils/storage';
import { visitedRequest } from '@/services/user';
import { setToken } from '@/utils/api';

interface IUser {
  username?: string;
  token?: string;
  isLogin?: boolean;
}

export default function userModel() {
  //页面刷新查看本地session
  let user0 = storage.getSessionItem('user');
  console.log('session user', user0);
  if (user0 == undefined) {
    //查看本地缓存用户
    user0 = storage.getLocalItem('user');
    console.log('local user', user0);
    if (user0 == undefined) {
      //初始化为游客
      useRequest(visitedRequest, {
        onSuccess: (data) => {
          user0 = data;
          user0.isLogin = false;
          console.log('init user', user0);
          storage.setLocalItem('user', user0);
          storage.setSessionItem('user', user0);
          setToken(user0.token);
        },
      });
    } else {
      storage.setSessionItem('user', user0);
      setToken(user0.token);
    }
  } else {
    setToken(user0.token);
  }

  const [user, setUser] = useState<IUser>(user0);

  //用户登录
  const login = useCallback((username, token) => {
    user0 = {
      username: username,
      token: token,
      isLogin: true,
    };
    saveUser(user0);
  }, []);

  //用户退出
  const logout = useCallback(() => {
    console.log('logout');
    user0 = {
      isLogin: false,
    };
    saveUser(user0);
  }, []);

  function saveUser(user: IUser) {
    setUser(user);
    storage.setSessionItem('user', user);
    setToken(user.token);
  }

  return {
    user,
    login,
    logout,
  };
}
