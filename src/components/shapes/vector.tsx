/* eslint-disable no-unused-vars */
interface vector {
  x: number,
  y: number,
}
interface distanceAndPoint {
  distance: number,
  point: vector,
}
const Vector = {
  length: (a: vector): number => (
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
  distancePP: (a: vector, b: vector): number => (Vector.length({ x: a.x - b.x, y: a.y - b.y })),
  distancePL: (P: vector, A: vector, B: vector): distanceAndPoint => {
    // console.log([P, A, B]);
    const AP = Vector.sub(P, A);
    const AB = Vector.sub(B, A);
    const r = Vector.mulV(AP, AB) / (AB.x * AB.x + AB.y * AB.y);
    const C = Vector.add(A, Vector.mulN(AB, r));
    let distance = 100;
    let point = C;
    if (r < 0) {
      distance = Vector.length(Vector.sub(A, P));
      point = A;
    } else if (r < 1) {
      distance = Vector.length(Vector.sub(C, P));
      point = C;
    } else {
      distance = Vector.length(Vector.sub(B, P));
      point = B;
    }
    return { distance, point };
  },
  // distance from point to ellipse
  distancePE: (p: vector, a: number, b: number): distanceAndPoint => {
    const absP = { x: Math.abs(p.x), y: Math.abs(p.y) };
    const ellipsePoint = (x: number) => ({
      x,
      y: Math.sqrt(
        (b * b * (a * a - x * x)) / (a * a),
      ),
    });
    const value = (x: number) => (Vector.distancePP(ellipsePoint(x), absP));
    let l = 0;
    let r = a;
    const EPS = 1e-4;
    while (Math.abs(value(l) - value(r)) > EPS) {
      const mid1 = l + (r - l) / 3;
      const mid2 = r - (r - l) / 3;
      if (value(mid1) < value(mid2)) {
        r = mid2;
      } else {
        l = mid1;
      }
    }
    const ans = (l + r) / 2;
    const ansP = ellipsePoint(ans);
    if (p.x < 0) ansP.x = -ansP.x;
    if (p.y < 0) ansP.y = -ansP.y;
    return {
      distance: value(ans),
      point: ansP,
    };
  },
  midPoint: (a: vector, b: vector): vector => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }),
};
export default Vector;
