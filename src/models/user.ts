import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface UserModelType {
  namespace: 'user';
  state: any;
  effects: {
    login: Effect;
  };
  reducers: {
    save: Reducer;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    username: 'zhangsan',
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        user: payload.data,
      };
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      console.log(payload);
      yield put({ type: 'save', payload: payload });
    },
  },
};

export default UserModel;
