// eslint-disable-next-line no-unused-vars
import { Text, Transformer } from 'react-konva';
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Konva from 'konva';
import getCurrentDoc from '../../client/client';
import { useStateStore } from '../../store/store';

const doc = getCurrentDoc();
interface Props {
  item: BaseShapes.Text,
  index: number,
  click: any,
  isSelected: boolean,
  onDragStart: any,
  onDragEnd: any,
  onTransformStart: any,
  onTransformEnd: any,
}

const TEXT: React.FC<Props> = (props: Props) => {
  const {
    item, index, click, isSelected, onDragEnd, onDragStart, onTransformEnd, onTransformStart,
  } = props;
  const [visible, setVisible] = useState(true);
  const shapeRef = React.useRef<any>();
  const trRef = React.useRef<any>();
  const state = useStateStore();
  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (
    <>
      <Text
        x={item.x}
        y={item.y}
        text={item.text}
        ref={shapeRef}
        key={index}
        draggable={state.selectShape === 'FREE' && item.draggable}
        onClick={click}
        onTap={click}
        visible={visible}
        rotation={item.rotation}
        scaleX={item.scaleX}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDblClick={() => {
          console.log(item);
          const textarea = document.createElement('textarea');
          document.body.appendChild(textarea);
          const textNode = new Konva.Text({
            text: 'Some text here',
            x: 50,
            y: 80,
            fontSize: 20,
            draggable: true,
            width: 1000,
          });
          textarea.style.fontSize = `${item.fontSize * item.shift.scale}px`;
          textarea.style.position = 'absolute';
          textarea.value = item.text;
          setVisible(false);
          textarea.style.transformOrigin = 'left top';
          textarea.style.top = `${item.y * item.shift.scale + item.shift.y}px`;
          textarea.style.left = `${item.x * item.shift.scale + item.shift.x}px`;
          textarea.style.border = 'none';
          textarea.style.padding = '0px';
          textarea.style.margin = '0px';
          textarea.style.overflow = 'hidden';
          textarea.style.background = 'none';
          textarea.style.fontFamily = 'Arial';
          textarea.style.lineHeight = String(textNode.lineHeight());
          textarea.style.textAlign = textNode.align();
          textarea.style.outline = 'none';
          textarea.style.resize = 'none';
          textarea.style.transformOrigin = 'left top';
          textarea.style.color = item.fill;
          textarea.style.height = `${item.height * state.stageScale}px`;
          textarea.style.width = `${item.width * state.stageScale + textNode.padding() * 2}px`;
          textarea.focus();
          textarea.addEventListener('keydown', () => {
            item.text = textarea.value;
            const node = shapeRef.current;
            item.height = node.height();
            doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: item }]);
          });
          function removeTextarea() {
            // @ts-ignore
            textarea.parentNode.removeChild(textarea);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            window.removeEventListener('click', handleOutsideClick);
            doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: item }]);
            setVisible(true);
          }
          function handleOutsideClick(e: { target: HTMLTextAreaElement; }) {
            if (e.target !== textarea) {
              item.text = textarea.value;
              removeTextarea();
            }
          }
          setTimeout(() => {
            // @ts-ignore
            window.addEventListener('click', handleOutsideClick);
          });
        }}
        fontSize={item.fontSize}
        width={item.width}
        fill={item.fill}
        onDragMove={(e) => {
          const afterE = {
            ...item,
            x: e.target.x(),
            y: e.target.y(),
          };
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
        onTransform={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const afterE: BaseShapes.Text = {
            ...item,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: node.height(),
            rotation: node.rotation(),
            scaleX: 1,
          };
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
        onTransformStart={onTransformStart}
        onTransformEnd={onTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={['middle-left', 'middle-right']}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default TEXT;
