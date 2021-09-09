import { postReqeust, getRequset } from '@/utils/post';

//查询问题接口
export function questionRequest(id: number) {
  return getRequset('/api/question/get/' + id);
}
