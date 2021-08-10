import Vector from './vector';

interface Point {
  x: number,
  y: number,
}

interface result {
  flag: boolean,
  adsorptionVertex: Point,
  adsorptionPoints: Array<Point>,
}

const checkAdsorptionPoint = (mouse: Point, shape: BaseShapes.Shape, miniDistance: number): result => {
  switch (shape.type) {
    case 'RECTANGLE': {
      const {
        rotation, width, height, x, y,
      } = shape;
      const center = { x, y };
      let vertexs = [
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: width, y: height },
        { x: 0, y: height },
      ];
      const realDegree = (rotation * 2 * Math.PI) / 360;
      vertexs = vertexs.map((vertex) => (Vector.add(center, Vector.rotate(vertex, realDegree))));
      let flag = false;
      let miniRes = { distance: miniDistance + 1, point: { x: 0, y: 0 } };
      vertexs.forEach((p: Point, ind: number) => {
        let line = [];
        if (ind === 3) {
          line = [p, vertexs[0]];
        } else {
          line = [p, vertexs[ind + 1]];
        }
        const res = Vector.distancePL(mouse, line[0], line[1]);
        if (res.distance < miniDistance) {
          flag = true;
          if (miniRes.distance > res.distance) {
            miniRes = res;
          }
        }
      });
      let adsorptionVertex = miniRes.point;
      let adsorptionPoints = [
        { x: width / 2, y: 0 },
        { x: width, y: height / 2 },
        { x: width / 2, y: height },
        { x: 0, y: height / 2 },
      ];
      adsorptionPoints = adsorptionPoints.map((vertex) => (Vector.add(center, Vector.rotate(vertex, realDegree))));

      miniRes = { distance: miniDistance + 1, point: { x: 0, y: 0 } };
      adsorptionPoints.forEach((point) => {
        const dis = Vector.distancePP(point, adsorptionVertex);
        if (dis < miniDistance) {
          if (miniRes.distance > dis) {
            miniRes = {
              distance: dis,
              point,
            };
          }
        }
      });
      if (miniRes.distance < miniDistance) adsorptionVertex = miniRes.point;
      return { flag, adsorptionPoints, adsorptionVertex };
    }
    case 'CIRCLE': {
      const {
        radius, x, y,
      } = shape;
      const center = { x, y };
      const dist = Vector.distancePP(center, mouse);
      let flag = false;
      let adsorptionVertex = { x: 0, y: 0 };
      if (Math.abs(dist - radius) < miniDistance) {
        flag = true;
        adsorptionVertex = Vector.add(center, Vector.mulN(Vector.init(Vector.sub(mouse, center)), radius));
      }
      return { flag, adsorptionVertex, adsorptionPoints: [] };
    }
    case 'ELLIPSE':
      break;
    case 'DIAMOND':
      break;
    case 'IMAGE':
      break;
    case 'TRIANGLE':
      break;
    case 'LINE':
      break;
    case 'ARROW':
      break;
    case 'TEXT':
      break;
    case 'CURVELINE':
      break;
    default:
      break;
  }
  return { flag: false, adsorptionVertex: { x: 0, y: 0 }, adsorptionPoints: [] };
};

export default checkAdsorptionPoint;
