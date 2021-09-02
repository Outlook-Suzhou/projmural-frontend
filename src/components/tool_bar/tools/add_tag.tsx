import { Icon } from '@fluentui/react/lib/Icon';
import React, { useState } from 'react';
import {
  Button, Col, Input, Popover, Row, Tooltip,
} from 'antd';
import { useStateStore } from '../../../store/store';
import getCurrentDoc from '../../../client/client';

const doc = getCurrentDoc();
const AddTag: React.FC<{}> = () => {
  const tagContent: React.FC<{}> = () => {
    const state = useStateStore();
    const [text, setText] = useState('');
    function onChangeText(e: any) {
      setText(e.target.value);
    }
    return (
      <>
        <Row>
          <Col>
            <Input placeholder="Enter tag..." onChange={onChangeText} bordered={false} />
          </Col>
          <Col>
            <Button
              shape="circle"
              onClick={() => {
                console.log(text);
                const { projs } = state.currentItem;
                projs[state.currentItem.selectProj].tags.push_back({ text, x: 6 });
                const afterE = { ...doc.value.data.shapes[state.currentIndex], projs };
                doc.value.submitOp([{ p: ['shapes', state.currentIndex], ld: state.currentItem, li: afterE }]);
              }}
            >
              +
            </Button>
          </Col>
        </Row>
      </>
    );
  };
  return (
    <div className="tool_icon">
      <Popover placement="right" content={tagContent} trigger="click">
        <Tooltip title="管理标签">
          <Icon
            iconName="Tag"
          />
        </Tooltip>
      </Popover>
    </div>
  );
};
export default AddTag;
