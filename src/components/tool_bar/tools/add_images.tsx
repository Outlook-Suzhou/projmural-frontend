/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line no-unused-vars
import { Icon } from '@fluentui/react/lib/Icon';
import addImg from '../../../utils/add_img';

const AddImage: React.FC<{}> = () => (
  // eslint-disable-next-line object-curly-newline
  <div className="tool_icon" style={{ textAlign: 'center' }}>
    <Icon
      iconName="PictureFill"
      style={{ fontSize: '40px', margin: 'auto' }}
      onClick={() => addImg({
        width: 20, height: 50, x: 300, y: 300, type: 'IMAGE', url: 'https://konvajs.org/assets/lion.png',
      })}
    />
  </div>

);
export default AddImage;
