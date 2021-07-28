/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line no-unused-vars
import { Icon } from '@fluentui/react/lib/Icon';
import addText from '../../../utils/add_text';

const AddText: React.FC<{}> = () => (
  // eslint-disable-next-line object-curly-newline
  <div className="tool_icon">
    <Icon
      iconName="Edit"
      style={{ fontSize: '40px', margin: 'auto' }}
      onClick={() => addText({
        width: 20, height: 50, x: 300, y: 300, type: 'TEXT', text: '请输入文字', fontSize: 15,
      })}
    />
  </div>

);
export default AddText;
