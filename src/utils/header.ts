export const token = '';

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
