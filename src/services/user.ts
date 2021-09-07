export function loginRequest(params: any) {
  return {
    url: '/api/user/login',
    method: 'POST',
    data: params,
  };
}
