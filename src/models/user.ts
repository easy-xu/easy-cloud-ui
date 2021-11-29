import { useState, useCallback } from 'react';
import { useRequest } from 'umi';
import storage from '@/utils/storage';
import { loginApi, initDevice, logoutApi } from '@/services/cms';
import { setToken } from '@/utils/api';

interface IUser {
  nickname?: string;
  userNo?: string;
  deviceNo?: string;
  username?: string;
  token?: string;
  isLogin?: boolean;
}

export default function userModel() {
  const [user, setUser] = useState<IUser>({ isLogin: false });

  //用户登录请求
  const loginRequest = useRequest((params) => loginApi(params), {
    manual: true,
    onSuccess: (result) => {
      saveUser({ ...result, isLogin: true });
    },
  });
  //用户退出请求
  const logoutRequest = useRequest(() => logoutApi(), {
    manual: true,
    onSuccess: (result) => {
      saveUser({ ...result, isLogin: false });
    },
  });

  //初始化设备编号请求
  const initDeviceRequest = useRequest(initDevice, {
    manual: true,
    onSuccess: (data) => {
      const user0 = { ...data, isLogin: false };
      saveUser(user0);
    },
  });

  //用户初始化
  const init = useCallback(() => {
    //查看本地session
    let user0 = storage.getSessionItem('user');
    if (user0 != undefined) {
      saveUser(user0);
      return;
    }
    //查看本地缓存用户
    user0 = storage.getLocalItem('user');
    if (user0 != undefined) {
      saveUser(user);
      return;
    }
    //初始化设备编号
    initDeviceRequest.run();
  }, []);

  //用户登录
  const login = useCallback((username, password) => {
    loginRequest.run({
      username: username,
      password: password,
    });
  }, []);

  //用户退出
  const logout = useCallback(() => {
    logoutRequest.run();
  }, []);

  function saveUser(user0: IUser) {
    //设置缓存
    storage.setLocalItem('user', user0);
    storage.setSessionItem('user', user0);
    //设置token
    setToken(user0.token);
    //设置state
    setUser(user0);
  }

  return {
    user,
    init,
    login,
    logout,
  };
}
