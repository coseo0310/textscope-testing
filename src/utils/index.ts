export const setCookie = (key: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = date.toUTCString();
  }
  document.cookie = `${key}=${value}; expires=${expires}; path=/; samesite=lax`;
};
export const getCookie = (key: string) => {
  let nameEQ = key + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
export const eraseCookie = (key: string) => {
  document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const notification = () => {
  // TODO: Notification setting
  if (Notification.permission !== "denied") {
    Notification.requestPermission((permission) => {
      if (permission === "granted") {
        new Notification("Hi, Notification");
      } else {
        alert("Notification denied");
      }
    });
  }
};

interface positionOption {
  form: HTMLDivElement;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
  scale: number;
  margin: number;
}

export const getScrollPosition = ({
  form,
  dx,
  dy,
  dWidth,
  dHeight,
  scale,
  margin,
}: positionOption): { left: number; top: number } => {
  const eWidth = form.clientWidth;
  const eHeight = form.clientHeight;

  const x = (dx + margin) * scale;
  const y = (dy + margin) * scale;
  const w = dWidth * scale;
  const h = dHeight * scale;
  const scrollTop = form.scrollTop;

  const left = x - eWidth / 2 + w / 2;
  const top = y + scrollTop - eHeight / 2 + h / 2;

  return { left, top };
};
