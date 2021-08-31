import { Line } from 'react-konva';
import Vector from './vector';
// eslint-disable-next-line import/namespace
interface Props {
  x: number,
  y: number,
  size: number,
  font: string,
  color: string,
}

interface vector {
  x: number,
  y: number,
}

const getPoints = (start: vector): Array<number> => {
  let ret: Array<number> = [];

  let now = start;
  ret = ret.concat(Vector.toList(now));

  
  return ret;
}

const Pointer: React.FC<Props> = (props: Props) => {
  const {
    x, y, size, font, color
  } = props;
};
export default Pointer;