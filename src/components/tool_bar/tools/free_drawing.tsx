import { Icon } from '@fluentui/react/lib/Icon';
import React from 'react';
import {
  Col, Popover, Row, Tooltip,
} from 'antd';
import { useDispatchStore } from '../../../store/store';

const gridStyle: any = {
  textAlign: 'center',
  cursor: 'pointer',
  fontSize: '30px',
};
const Content: React.FC<{}> = () => {
  const dispatch = useDispatchStore();
  return (
    <>
      <Row
        style={{
          width: '120px',
          height: 'auto',
        }}
        gutter={16}
      >
        <Col
          span={8}
          role="button"
          tabIndex={0}
          onClick={() => {
            dispatch({ type: 'setDrawing', payload: 1 });
            // const stage = document.getElementById('stage');
            // let lastLine: { points: any; fill?: string; globalCompositeOperation?: string; type?: string;};
            // // @ts-ignore
            // stage.addEventListener('onmousedown', () => {
            //   // @ts-ignore
            //   const pos = stage.getPointerPosition();
            //   console.log('mousedown');
            //   lastLine = {
            //     fill: '#df4b26',
            //     globalCompositeOperation: 'source-over',
            //     points: [pos.x, pos.y],
            //     type: 'CURVELINE',
            //   };
            //   doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: lastLine }]);
            // });
            // // @ts-ignore
            // stage.addEventListener('onmousemove', () => {
            //   // @ts-ignore
            //   const pos = stage.getPointerPosition();
            //   const newPoints = lastLine.points().concat([pos.x, pos.y]);
            //   lastLine.points(newPoints);
            //   doc.submitOp([{ p: ['shapes', doc.data.shapes.length - 1], li: lastLine }]);
            // });
          }}
          style={gridStyle}
        >
          <Icon
            iconName="edit"
          />
        </Col>
        <Col
          span={8}
          className="chooseShapeButton"
          role="button"
          tabIndex={-1}
          onClick={() => {
            dispatch({ type: 'setDrawing', payload: 2 });
          }}
          style={gridStyle}
        >
          <Icon
            iconName="WipePhone"
          />
        </Col>
      </Row>
    </>
  );
}
const FreeDrawing: React.FC<{}> = () => (
  <div className="tool_icon">
    <Popover trigger="click" placement="right" content={Content}>
      <Tooltip title="自由画笔">
        <Icon
          iconName="EditCreate"
          style={{ fontSize: '40px', margin: 'auto' }}
        />
      </Tooltip>
    </Popover>
  </div>
);
export default FreeDrawing;
