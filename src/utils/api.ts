export let token = '';

export function setToken(value: any) {
  token = value;
}

export function getHeader() {
  return {
    requestId: genRequestId(),
    token: token,
    signature: '',
    timestamp: new Date().getTime(),
  };
}

function genRequestId() {
  const now = new Date();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  return (
    now.getFullYear().toString() +
    month.toString() +
    day +
    hour +
    minutes +
    seconds +
    Math.round(Math.random() * 89999 + 100000).toString()
  );
}

export function postRequest(url: string, params: any) {
  return {
    url: url,
    method: 'POST',
    data: params,
    headers: getHeader(),
  };
}

export function getRequest(url: string, params?: any) {
  return {
    url: url,
    method: 'GET',
    params: params,
    headers: getHeader(),
  };
}
