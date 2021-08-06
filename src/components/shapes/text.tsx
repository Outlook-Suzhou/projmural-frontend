// eslint-disable-next-line no-unused-vars
import { Text, Transformer } from 'react-konva';
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import Konva from 'konva';
import doc from '../../client/client';

interface Props {
  item: BaseShapes.Text,
  index: number,
  click: any,
  isSelected: boolean
}

const TEXT: React.FC<Props> = (props: Props) => {
  const {
    item, index, click, isSelected,
  } = props;
  const [visible, setVisible] = useState(true);
  const shapeRef = React.useRef<any>();
  const trRef = React.useRef<any>();
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
        draggable
        onClick={click}
        onTap={click}
        visible={visible}
        rotation={item.rotation}
        scaleX={item.scaleX}
        onDblClick={() => {
          const textarea = document.createElement('textarea');
          document.body.appendChild(textarea);
          const textNode = new Konva.Text({
            text: 'Some text here',
            x: 50,
            y: 80,
            fontSize: 20,
            draggable: true,
            width: 200,
          });
          textarea.style.position = 'absolute';
          textarea.value = item.text;
          setVisible(false);
          // @ts-ignore
          const stage = document.getElementById('stage').getBoundingClientRect();
          textarea.style.transformOrigin = 'left top';
          textarea.style.top = `${item.y + stage.top}px`;
          textarea.style.left = `${item.x + stage.left}px`;
          textarea.style.fontSize = `${item.fontSize}px`;
          textarea.style.width = '1000px';
          textarea.style.height = '1000px';
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
          textarea.style.width = `${item.width - textNode.padding() * 2}px`;
          textarea.focus();
          textarea.addEventListener('keydown', () => {
            item.text = textarea.value;
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
            width: e.target.width(),
            height: e.target.height(),
            x: e.target.x(),
            y: e.target.y(),
            fontSize: item.fontSize,
            type: 'TEXT',
            text: item.text,
            fill: item.fill,
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
            type: 'TEXT',
            fill: item.fill,
            rotation: node.rotation(),
            draggable: item.draggable,
            scaleX: 1,
          };
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
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
