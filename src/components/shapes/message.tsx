import React, { useEffect, useRef } from 'react';
import {
  Transformer, Shape,
} from 'react-konva';
import { Html } from 'react-konva-utils';
import { Mentions } from 'antd';
import shapeConfig from './shape_config';
import { useDispatchStore, useStateStore } from '../../store/store';

interface Props {
  item: BaseShapes.Message,
  isSelected: boolean,
  onSelect: any,
  index: number,
  onDragStart: any,
  onDragEnd: any,
  onTransformStart: any,
  onTransformEnd: any
}
const Message: React.FC<Props> = (props: Props) => {
  const {
    item, isSelected, onSelect, index, onDragStart, onDragEnd, onTransformStart, onTransformEnd,
  } = props;

  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  const [state] = [useStateStore(), useDispatchStore()];
  const { Option } = Mentions;
  useEffect(() => {
    // we need to attach transformer manually
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Shape
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...item}
        {...shapeConfig}
        draggable={item.draggable && state.selectShape === 'FREE'}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(0, 0);
          context.lineTo(item.width, 0);
          context.lineTo(item.width, item.height);
          context.lineTo(item.width * 0.4, item.height);
          context.lineTo(item.width * 0.2, item.height * 1.1);
          context.lineTo(item.width * 0.2, item.height);
          context.lineTo(0, item.height);
          context.closePath();
          // (!) Konva specific method, it is very important
          context.fillStrokeShape(shape);
        }}
        onDragStart={onDragStart}
        onDragEnd={(e) => {
          onDragEnd();
          const afterE: BaseShapes.Message = {
            ...item,
            x: e.target.x(),
            y: e.target.y(),
          };
          state.currentDoc.value.submitOp([{ p: ['shapes', index], ld: state.currentDoc.value.data.shapes[index], li: afterE }]);
        }}
        onTransformStart={onTransformStart}
        onTransformEnd={onTransformEnd}
        onTransform={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          const afterE: BaseShapes.Message = {
            ...item,
            x: node.x(),
            y: node.y(),
            // fontSize: Math.min(item.width * 0.1, Math.max(item.width * 0.07, item.fontSize * Math.min(scaleX, scaleY))),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            type: 'MESSAGE',
            rotation: node.rotation(),
          };

          state.currentDoc.value.submitOp([{ p: ['shapes', index], ld: state.currentDoc.value.data.shapes[index], li: afterE }]);
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox: any, newBox: { width: number; height: number; }) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return { ...newBox };
          }}
          rotateEnabled={false}
          borderStroke="black"
          anchorStroke="black"
          anchorCornerRadius={5}
        />
      )}
      <Html
        groupProps={{
          x: item.x, y: item.y, width: item.width, height: item.height,
        }}
      >
        <Mentions
          autoFocus
          autoSize
          style={{ width: item.width, fontSize: item.fontSize, maxHeight: item.height }}
          placeholder="Comment and @someone"
          value={item.text}
          onChange={(text :string) => {
            item.text = text;
            const afterE: BaseShapes.Message = {
              ...item,
              text,
            };
            console.log(afterE);
            state.currentDoc.value.submitOp([{ p: ['shapes', index], ld: state.currentDoc.value.data.shapes[index], li: afterE }]);
          }}
        >
          <Option value="Yao Liu" key="t-lyao">Yao Liu</Option>
          <Option value="Yu Yuan" key="t-yuanyu">Yu Yuan</Option>
          <Option value="Zhigang Yang" key="t-zhiyang">Zhigang Yang</Option>
        </Mentions>
      </Html>
    </>
  );
};

export default Message;
