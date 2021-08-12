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

interface distanceAndPoint {
  distance: number,
  point: Point,
}

const miniDistanceAndPointP = (p: Point, l: Array<Point>, miniDistance: number): distanceAndPoint => {
  let miniRes = { distance: miniDistance, point: { x: 0, y: 0 } };
  l.forEach((point) => {
    const dis = Vector.distancePP(point, p);
    if (dis < miniDistance) {
      miniRes = {
        distance: dis,
        point,
      };
    }
  });
  return miniRes;
};

const miniDistanceAndPointL = (mouse: Point, l: Array<Point>, miniDistance: number): distanceAndPoint => {
  let miniRes = { distance: miniDistance, point: { x: 0, y: 0 } };
  l.forEach((p: Point, ind: number) => {
    let line = [];
    if (ind === l.length - 1) {
      line = [p, l[0]];
    } else {
      line = [p, l[ind + 1]];
    }
    const res = Vector.distancePL(mouse, line[0], line[1]);
    if (miniRes.distance > res.distance) {
      miniRes = res;
    }
  });
  return miniRes;
};

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
      let miniRes = miniDistanceAndPointL(mouse, vertexs, miniDistance);
      let flag = false;
      if (miniRes.distance < miniDistance) flag = true;
      let adsorptionVertex = miniRes.point;
      let adsorptionPoints = [
        { x: width / 2, y: 0 },
        { x: width, y: height / 2 },
        { x: width / 2, y: height },
        { x: 0, y: height / 2 },
      ];
      adsorptionPoints = adsorptionPoints.map((vertex) => (Vector.add(center, Vector.rotate(vertex, realDegree))));
      miniRes = miniDistanceAndPointP(adsorptionVertex, adsorptionPoints, miniDistance);
      if (miniRes.distance < miniDistance) adsorptionVertex = miniRes.point;
      return { flag, adsorptionPoints, adsorptionVertex };
    }
    case 'CIRCLE': {
      const {
        radius, x, y, rotation,
      } = shape;
      const center = { x, y };
      const realDegree = (rotation * 2 * Math.PI) / 360;
      const dist = Vector.distancePP(center, mouse);
      let flag = false;
      let adsorptionVertex = { x: 0, y: 0 };
      if (Math.abs(dist - radius) < miniDistance) {
        flag = true;
        adsorptionVertex = Vector.add(center, Vector.mulN(Vector.init(Vector.sub(mouse, center)), radius));
      }
      let adsorptionPoints = [
        { x: radius, y: 0 },
        { x: -radius, y: 0 },
        { x: 0, y: radius },
        { x: 0, y: -radius },
      ];
      adsorptionPoints = adsorptionPoints.map((point) => (Vector.add(center, Vector.rotate(point, realDegree))));
      const miniRes = miniDistanceAndPointP(adsorptionVertex, adsorptionPoints, miniDistance);
      if (miniRes.distance < miniDistance) adsorptionVertex = miniRes.point;
      return { flag, adsorptionVertex, adsorptionPoints };
    }
    case 'ELLIPSE': {
      const {
        x, y, radius, rotation,
      } = shape;
      const center = { x, y };
      const realDegree = (rotation * Math.PI * 2) / 360;
      const centerToMouse = Vector.sub(mouse, center);
      const res = Vector.distancePE(Vector.rotate(centerToMouse, -realDegree), radius.x, radius.y);
      let flag = false;
      let adsorptionVertex = { x: 0, y: 0 };
      if (res.distance < miniDistance) {
        flag = true;
        adsorptionVertex = Vector.add(center, Vector.rotate(res.point, realDegree));
      }
      let adsorptionPoints = [
        { x: radius.x, y: 0 },
        { x: -radius.x, y: 0 },
        { x: 0, y: radius.y },
        { x: 0, y: -radius.y },
      ];
      adsorptionPoints = adsorptionPoints.map((point) => (Vector.add(center, Vector.rotate(point, realDegree))));
      const miniRes = miniDistanceAndPointP(adsorptionVertex, adsorptionPoints, miniDistance);
      if (miniRes.distance < miniDistance) adsorptionVertex = miniRes.point;
      return { flag, adsorptionVertex, adsorptionPoints };
    }
    case 'DIAMOND': {
      const {
        x, y, radius, rotation,
      } = shape;
      const center = { x, y };
      let vertexs = [
        { x: 0, y: radius.y },
        { x: radius.x, y: 0 },
        { x: 0, y: -radius.y },
        { x: -radius.x, y: 0 },
      ];
      const realDegree = (rotation * 2 * Math.PI) / 360;
      vertexs = vertexs.map((vertex) => (Vector.add(center, Vector.rotate(vertex, realDegree))));
      let miniRes = miniDistanceAndPointL(mouse, vertexs, miniDistance);
      let flag = false;
      if (miniRes.distance < miniDistance) flag = true;
      let adsorptionVertex = miniRes.point;
      const adsorptionPoints = vertexs.map((p, ind: number) => {
        if (ind === 3) return Vector.midPoint(p, vertexs[0]);
        return Vector.midPoint(p, vertexs[ind + 1]);
      });
      miniRes = miniDistanceAndPointP(adsorptionVertex, adsorptionPoints, miniDistance);
      if (miniRes.distance < miniDistance) adsorptionVertex = miniRes.point;
      return { flag, adsorptionVertex, adsorptionPoints };
    }
    case 'IMAGE': {
      const {
        rotation, width, height, x, y,
      } = shape;
      const center = { x, y };
      const realDegree = (rotation * 2 * Math.PI) / 360;
      let vertexs = [
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: width, y: height },
        { x: 0, y: height },
      ];
      vertexs = vertexs.map((vertex) => (Vector.add(center, Vector.rotate(vertex, realDegree))));
      let miniRes = miniDistanceAndPointL(mouse, vertexs, miniDistance);
      let flag = false;
      if (miniRes.distance < miniDistance) flag = true;
      let adsorptionVertex = miniRes.point;
      let adsorptionPoints = [
        { x: width / 2, y: 0 },
        { x: width, y: height / 2 },
        { x: width / 2, y: height },
        { x: 0, y: height / 2 },
      ];
      adsorptionPoints = adsorptionPoints.map((vertex) => (Vector.add(center, Vector.rotate(vertex, realDegree))));
      miniRes = miniDistanceAndPointP(adsorptionVertex, adsorptionPoints, miniDistance);
      if (miniRes.distance < miniDistance) adsorptionVertex = miniRes.point;
      return { flag, adsorptionPoints, adsorptionVertex };
    }
    case 'TRIANGLE': {
      const {
        x, y, radius, rotation,
      } = shape;
      const center = { x, y };
      const realDegree = (rotation * 2 * Math.PI) / 360;
      let vertexs = [
        { x: -radius.x, y: 0 },
        { x: 0, y: radius.y },
        { x: radius.x, y: 0 },
      ];
      vertexs = vertexs.map((vertex) => (Vector.add(center, Vector.rotate(vertex, realDegree))));
      let miniRes = miniDistanceAndPointL(mouse, vertexs, miniDistance);
      let flag = false;
      if (miniRes.distance < miniDistance) flag = true;
      let adsorptionVertex = miniRes.point;
      const adsorptionPoints = vertexs.map((p, ind: number) => {
        if (ind === 2) return Vector.midPoint(p, vertexs[0]);
        return Vector.midPoint(p, vertexs[ind + 1]);
      });
      miniRes = miniDistanceAndPointP(adsorptionVertex, adsorptionPoints, miniDistance);
      if (miniRes.distance < miniDistance) adsorptionVertex = miniRes.point;
      return { flag, adsorptionPoints, adsorptionVertex };
    }
    case 'LINE': {
      const {
        start, end, x, y,
      } = shape;
      const center = { x, y };
      const points = [Vector.add(center, start), Vector.add(center, end)];
      const miniRes = miniDistanceAndPointP(mouse, points, miniDistance);
      let flag = false;
      const adsorptionVertex = miniRes.point;
      if (miniRes.distance < miniDistance) flag = true;
      const adsorptionPoints = points;
      return { flag, adsorptionVertex, adsorptionPoints };
    }
    case 'ARROW': {
      const {
        start, end, x, y,
      } = shape;
      const center = { x, y };
      const points = [Vector.add(center, start), Vector.add(center, end)];
      const miniRes = miniDistanceAndPointP(mouse, points, miniDistance);
      let flag = false;
      const adsorptionVertex = miniRes.point;
      if (miniRes.distance < miniDistance) flag = true;
      const adsorptionPoints = points;
      return { flag, adsorptionVertex, adsorptionPoints };
    }
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
