export const calcZoomX = (x:number, scale: number, posX: number) => x * scale + posX; // calc x,y after zoom
export const calcZoomY = (y:number, scale: number, posY: number) => y * scale + posY;
export const calcX = (x:number, scale: number, posX: number) => (x - posX) / scale; // calc x,y before zoom
export const calcY = (y:number, scale: number, posY: number) => (y - posY) / scale;
