import { postRequest } from '@/utils/api';

export function jobOption(option: string, params: any) {
  return postRequest(`/job/${option}`, params);
}
