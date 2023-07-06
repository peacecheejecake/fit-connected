export const isMobile = () => {
  const { userAgent, maxTouchPoints } = window.navigator;
  

  // iOS 13 이상
  const isIOSWeb =
    /iPhone|iPad/i.test(userAgent) ||
    (/Macintosh/i.test(userAgent) && maxTouchPoints > 0);

  const isAndWeb = /Android/i.test(userAgent);

  return isIOSWeb || isAndWeb;
};
