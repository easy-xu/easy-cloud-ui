import { request } from 'umi';

export async function loginApi(req: any) {
    return request('/api/user/login', {
        method: 'GET',
        req,
    });
}