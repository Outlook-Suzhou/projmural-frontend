import { Line as KonvaLine } from 'react-konva';
import doc from '../../client/client';
import shapeConfig from './shape_config';

interface vector {
  x: number;
  y: number;
}

function getRect(start: vector, end: vector, weight: number) {
  const vectorAdd = (a:vector, b:vector) => [a.x + b.x, a.y + b.y];

  const dx = start.x - end.x;
  const dy = start.y - start.y;
  const dxy = Math.sqrt(dx * dx + dy * dy);
  const cos = dx / dxy;
  const sin = dy / dxy;
  const dvecx = start.x + (weight * sin) / 2;
  const dvecy = start.y + (weight * cos) / 2;

  const ret: Array<number> = [];
  ret.concat(vectorAdd(start, { x: dvecx, y: dvecy }));
  ret.concat(vectorAdd(start, { x: -dvecx, y: -dvecy }));
  ret.concat(vectorAdd(end, { x: -dvecx, y: -dvecy }));
  ret.concat(vectorAdd(end, { x: dvecx, y: dvecy }));
  return ret;
}

// @ts-ignore
// eslint-disable-next-line react/prop-types
const Line = ({ item, index, click }) => (
  // eslint-disable-next-line react/react-in-jsx-scope
  <KonvaLine
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...item}
    // eslint-disable-next-line react/prop-types
    points={getRect(item.start, item.end, item.weight)}
    closed
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...shapeConfig}
    key={index}
    fill="black"
    draggable
    onClick={click}
    onDragMove={(e) => {
      const afterE = {
        weight: e.target.attrs.weight,
        end: e.target.attrs.end,
        start: e.target.attrs.start,
        type: 'Line',
      };
      doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
    }}
  />
);

export default Line;
