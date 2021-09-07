export function loginRequest(params: any) {
  return {
    url: '/api/user/login',
    method: 'POST',
    data: params,
  };
}
export function signinRequest(params: any) {
  return {
    url: '/api/user/signIn',
    method: 'POST',
    data: params,
  };
}
