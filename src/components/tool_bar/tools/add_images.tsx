/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line no-unused-vars
import { Icon } from '@fluentui/react/lib/Icon';
import { Upload } from 'element-react';
import addImg from '../../../utils/add_img';
import 'element-theme-default';
// eslint-disable-next-line import/order
import { fileURLToPath } from 'url';

const handleAvatarScucess = (res: any, file: any) => {
  console.log(res);
  console.log(fileURLToPath(file.raw));
};
const handlePreview = (file: any) => {
  console.log(file);
};
const AddImage: React.FC<{}> = () => (
  // eslint-disable-next-line object-curly-newline
  <div className="tool_icon" style={{ textAlign: 'center' }}>
    <Upload
      className="upload-demo"
      action="//jsonplaceholder.typicode.com/posts/"
      showFileList={false}
      onSuccess={(res, file) => handleAvatarScucess(res, file)}
      onPreview={(file) => handlePreview(file)}
    >
      <Icon
        iconName="PictureFill"
        style={{ fontSize: '40px', margin: 'auto' }}
        onClick={() => addImg({
          width: 20, height: 50, x: 300, y: 300, type: 'IMAGE', url: 'https://konvajs.org/assets/lion.png',
        })}
        className="avatar"
      />
    </Upload>
  </div>

);
export default AddImage;
