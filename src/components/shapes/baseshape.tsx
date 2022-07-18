/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import Triangle from './triangle';
import Text from './text';
import Ellipse from './ellipse';
import Rectangle1 from './transform_rect';
import PointedRect from './pointed_rect';
import Diamond from './diamond';
import Circle from './circle';
import Line from './line';
import Arrow from './arrow';
import Img from './image';
import CurveLine from './curveline';
import TextRect from './text_rect';
import NewKanban from './newKanban';
import Star from './star';
import Message from './message';
import { useDispatchStore, useStateStore } from '../../store/store';
import getCurrentDoc from '../../client/client';

const doc = getCurrentDoc();
interface Shape {
  item: any;
  gridWidth: number;
  gridHeight: number;
  index: number;
  click: Function;
  currentIndex?: any;
  setCurrentItem?: Function;
  setCurrentIndex?: Function;
  del: Function;
}

const BaseShape: React.FC<Shape> = (props: Shape) => {
  const {
    item, gridWidth, gridHeight, index, click, del,
  } = props;
  let ShapeComponent: any;
  const state = useStateStore();
  const dispatch = useDispatchStore();

  const onDragStart = () => {
    dispatch({ type: 'setCurrentIndex', payload: index });
    dispatch({ type: 'setCurrentItem', payload: item });
    dispatch({ type: 'setIsDragging', payload: true });
    const ops = state.OpList;
    ops.push(JSON.stringify(doc.value.data.shapes));
    dispatch({ type: 'setOpList', payload: ops });
  };
  const onDragEnd = () => {
    dispatch({ type: 'setCurrentIndex', payload: index });
    dispatch({ type: 'setCurrentItem', payload: item });
    dispatch({ type: 'setIsDragging', payload: false });
  };
  const onTransformStart = () => {
    dispatch({ type: 'setIsDragging', payload: true });
    const ops = state.OpList;
    ops.push(JSON.stringify(doc.value.data.shapes));
    dispatch({ type: 'setOpList', payload: ops });
  };
  const onTransformEnd = () => { dispatch({ type: 'setIsDragging', payload: false }); };
  switch (item.type) {
    case 'RECTANGLE':
      ShapeComponent = (
        <Rectangle1
          item={item}
          gridWidth={gridWidth}
          gridHeight={gridHeight}
          index={index}
          isSelected={index === state.currentIndex}
          onSelect={click}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onTransformStart={onTransformStart}
          onTransformEnd={onTransformEnd}
        />
      );
      break;
    case 'POINTEDRECT':
      ShapeComponent = (
        <PointedRect
          item={item}
          gridWidth={gridWidth}
          gridHeight={gridHeight}
          index={index}
          isSelected={index === state.currentIndex}
          onSelect={click}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onTransformStart={onTransformStart}
          onTransformEnd={onTransformEnd}
        />
      );
      break;
    case 'CIRCLE':
      ShapeComponent = (
        <Circle
          item={item}
          index={index}
          isSelected={index === state.currentIndex}
          onSelect={click}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onTransformStart={onTransformStart}
          onTransformEnd={onTransformEnd}
        />
      );
      break;
    case 'ELLIPSE':
      ShapeComponent = (
        <Ellipse
          item={item}
          index={index}
          isSelected={index === state.currentIndex}
          onSelect={click}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onTransformStart={onTransformStart}
          onTransformEnd={onTransformEnd}
        />
      );
      break;
    case 'DIAMOND':
      ShapeComponent = (
        <Diamond
          item={item}
          index={index}
          isSelected={index === state.currentIndex}
          onSelect={click}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onTransformStart={onTransformStart}
          onTransformEnd={onTransformEnd}
        />
      );
      break;
    case 'IMAGE':
      ShapeComponent = (
        <Img
          item={item}
          index={index}
          isSelected={index === state.currentIndex}
          onSelect={click}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onTransformStart={onTransformStart}
          onTransformEnd={onTransformEnd}
        />
      );
      break;
    case 'TRIANGLE':
      ShapeComponent = (
        <Triangle
          item={item}
          index={index}
          isSelected={index === state.currentIndex}
          onSelect={click}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onTransformStart={onTransformStart}
          onTransformEnd={onTransformEnd}
        />
      );
      break;
    case 'LINE':
      ShapeComponent = <Line item={item} index={index} click={click} isSelected={index === state.currentIndex} onDragStart={onDragStart} onDragEnd={onDragEnd} />;
      break;
    case 'ARROW':
      ShapeComponent = <Arrow item={item} index={index} click={click} isSelected={index === state.currentIndex} onDragStart={onDragStart} onDragEnd={onDragEnd} />;
      break;
    case 'TEXT':
      ShapeComponent = (
        <Text
          item={item}
          index={index}
          click={click}
          isSelected={index === state.currentIndex}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onTransformStart={onTransformStart}
          onTransformEnd={onTransformEnd}
        />
      );
      break;
    case 'CURVELINE':
      ShapeComponent = <CurveLine item={item} index={index} onSelect={click} onMouseOver={del} />;
      break;
    case 'KANBAN':
      ShapeComponent = (
        <NewKanban
          item={item}
          index={index}
          onSelect={click}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onTransformStart={onTransformStart}
          onTransformEnd={onTransformEnd}
          isSelected={index === state.currentIndex}
        />
      );
      break;
    case 'TEXTRECT':
      ShapeComponent = (
        <TextRect
          gridWidth={gridWidth}
          gridHeight={gridHeight}
          item={item}
          index={index}
          isSelected={index === state.currentIndex}
          onSelect={click}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onTransformStart={onTransformStart}
          onTransformEnd={onTransformEnd}
        />
      );
      break;
    case 'STAR':
      ShapeComponent = (
        <Star
          item={item}
          index={index}
          isSelected={index === state.currentIndex}
          onSelect={click}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onTransformStart={onTransformStart}
          onTransformEnd={onTransformEnd}
        />
      );
      break;
    case 'MESSAGE':
      ShapeComponent = (
        <Message
          item={item}
          index={index}
          isSelected={index === state.currentIndex}
          onSelect={click}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onTransformStart={onTransformStart}
          onTransformEnd={onTransformEnd}
        />
      );
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
