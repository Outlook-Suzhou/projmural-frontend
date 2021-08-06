/* eslint-disable no-unused-vars */
interface vector {
  x: number,
  y: number,
}
const Vector = {
  size: (a: vector): number => (
    Math.sqrt(a.x * a.x + a.y * a.y)
  ),
  add: (a: vector, b: vector): vector => ({
    x: a.x + b.x,
    y: a.y + b.y,
  }),
  sub: (a: vector, b: vector): vector => ({
    x: a.x - b.x,
    y: a.y - b.y,
  }),
  mulV: (a: vector, b: vector): number => (
    a.x * b.x + a.y * b.y
  ),
  mulN: (a: vector, b: number): vector => ({
    x: a.x * b,
    y: a.y * b,
  }),
  init: (a: vector): vector => {
    const len: number = Math.sqrt(a.x * a.x + a.y * a.y);
    return {
      x: a.x / len,
      y: a.y / len,
    };
  },
  rotate: (v: vector, deg: number): vector => ({
    x: v.x * Math.cos(deg) - v.y * Math.sin(deg),
    y: v.x * Math.sin(deg) + v.y * Math.cos(deg),
  }),
  toList: (v: vector) => ([v.x, v.y]),
};
export default Vector;
