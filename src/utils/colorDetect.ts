const REG_HEX = /(^#?[0-9A-F]{6}$)|(^#?[0-9A-F]{3}$)/i;

function parseRGB(str: string) {
  if (typeof str === 'string' && REG_HEX.test(str)) {
    const str1 = str.replace('#', '');
    let arr;
    if (str1.length === 3) {
      arr = str1.split('').map((c) => (c + c));
    } else if (str1.length === 6) {
      arr = str1.match(/[a-zA-Z0-9]{2}/g);
    } else {
      throw new Error('wrong color format');
    }
    // @ts-ignore
    return arr.map((c) => parseInt(c, 16));
  }
  throw new Error('color should be string');
}

/*
 * rgb value to hsl 色相(H)、饱和度(S)、明度(L)
 */
function rgbToHsl(rgbStr: string) {
  let [r, g, b] = parseRGB(rgbStr);
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  return l;
}

/*
 * 判断颜色属于深色还是浅色
 */
const isColorDarkOrLight = (rgbStr: string) => {
  const l = rgbToHsl(rgbStr);
  return l > 0.5 ? 'light' : 'dark';
};

export default isColorDarkOrLight;
