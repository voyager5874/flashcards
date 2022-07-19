// const testUrl = (url: string) => {
//   const regExp = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
//   return regExp.test(url);
// };
// const testBase64 = (base64String: string) => {
//   const regExp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
//   return regExp.test(base64String);
// };

export const validateImage = (url: string): Promise<boolean> =>
  new Promise(resolve => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
