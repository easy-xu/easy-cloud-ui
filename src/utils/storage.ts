export function getSessionItem(name: string) {
  const strValue = sessionStorage.getItem(name);
  let item = undefined;
  if (strValue) {
    item = JSON.parse(strValue);
  }
  return item;
}

export function setSessionItem(name: string, value: any) {
  if (value == undefined) {
    sessionStorage.removeItem(name);
  } else {
    sessionStorage.setItem(name, JSON.stringify(value));
  }
}

export function getLocalItem(name: string) {
  const strValue = localStorage.getItem(name);
  let item = undefined;
  if (strValue) {
    item = JSON.parse(strValue);
  }
  return item;
}

export function setLocalItem(name: string, value: any) {
  if (value == undefined) {
    localStorage.removeItem(name);
  } else {
    localStorage.setItem(name, JSON.stringify(value));
  }
}

export default {
  getSessionItem,
  setSessionItem,
  getLocalItem,
  setLocalItem,
};
