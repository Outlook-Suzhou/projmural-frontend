/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import Triangle from './triangle';
import Text from './text';
import Ellipse from './ellipse';
import Rectangle1 from './transform_rect';
import Diamond from './diamond';
import Circle from './circle';
import Line from './line';
import Arrow from './arrow';
import Img from './image';
import CurveLine from './curveline';
import { useDispatchStore, useStateStore } from '../../store/store';
import doc from '../../client/client';

interface Shape {
  item: any;
  index: number;
  click: Function;
  currentIndex?: any;
  setCurrentItem?: Function;
  setCurrentIndex?: Function;
  del: Function;
}

const BaseShape: React.FC<Shape> = (props: Shape) => {
  const {
    item, index, click, del,
  } = props;
  let ShapeComponent: any;
  const state = useStateStore();
  const dispatch = useDispatchStore();

  const onDragStart = () => {
    dispatch({ type: 'setCurrentIndex', payload: index });
    const ops = state.OpList;
    const curShape = doc.data.shapes[index];
    ops.push({
      op: 'drag', shape: {}, index, before: curShape,
    });
    dispatch({ type: 'setOpList', payload: ops });
  };
  const onDragEnd = () => {
    dispatch({ type: 'setCurrentIndex', payload: index });
    const ops = state.OpList;
    const last = ops.pop();
    // @ts-ignore
    last.shape = doc.data.shapes[index];
    if (last) {
      ops.push(last);
    }
    dispatch({ type: 'setOpList', payload: ops });
  };
  // const dispatch = useDispatchStore();
  // console.log(dispatch);
  switch (item.type) {
    case 'RECTANGLE':
      ShapeComponent = <Rectangle1 item={item} index={index} isSelected={index === state.currentIndex} onSelect={click} onDragStart={onDragStart} onDragEnd={onDragEnd} />;
      break;
    case 'CIRCLE':
      ShapeComponent = <Circle item={item} index={index} isSelected={index === state.currentIndex} onSelect={click} onDragStart={onDragStart} onDragEnd={onDragEnd} />;
      break;
    case 'ELLIPSE':
      ShapeComponent = <Ellipse item={item} index={index} isSelected={index === state.currentIndex} onSelect={click} onDragStart={onDragStart} onDragEnd={onDragEnd} />;
      break;
    case 'DIAMOND':
      ShapeComponent = <Diamond item={item} index={index} isSelected={index === state.currentIndex} onSelect={click} onDragStart={onDragStart} onDragEnd={onDragEnd} />;
      break;
    case 'IMAGE':
      ShapeComponent = <Img item={item} index={index} isSelected={index === state.currentIndex} onSelect={click} onDragStart={onDragStart} onDragEnd={onDragEnd} />;
      break;
    case 'TRIANGLE':
      ShapeComponent = <Triangle item={item} index={index} isSelected={index === state.currentIndex} onSelect={click} onDragStart={onDragStart} onDragEnd={onDragEnd} />;
      break;
    case 'LINE':
      ShapeComponent = <Line item={item} index={index} click={click} isSelected={index === state.currentIndex} onDragStart={onDragStart} onDragEnd={onDragEnd} />;
      break;
    case 'ARROW':
      ShapeComponent = <Arrow item={item} index={index} click={click} isSelected={index === state.currentIndex} onDragStart={onDragStart} onDragEnd={onDragEnd} />;
      break;
    case 'TEXT':
      ShapeComponent = <Text item={item} index={index} click={click} isSelected={index === state.currentIndex} onDragStart={onDragStart} onDragEnd={onDragEnd} />;
      break;
    case 'CURVELINE':
      ShapeComponent = <CurveLine item={item} index={index} onSelect={click} onMouseOver={del} />;
      break;
    default:
      return ShapeComponent;
  }
  return ShapeComponent;
};

BaseShape.defaultProps = {
  // currentItem: {},
  currentIndex: -1,
  // setCurrentItem: () => {},
  // setCurrentIndex: () => {},
};
export default BaseShape;
