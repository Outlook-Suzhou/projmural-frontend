/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line no-unused-vars
import { Icon } from '@fluentui/react/lib/Icon';
import { message, Upload } from 'antd';
import 'crypto-js';// "base-64": "^0.1.0"
import 'base-64';//  "crypto-js": "^3.1.9-1"
import addShape from '../../../utils/add_function';
import { useDispatchStore, useStateStore } from '../../../store/store';
import doc from '../../../client/client';

class AliyunOSSUpload extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    OSSData: {
      accessId: undefined,
      policy: undefined,
      signature: undefined,
      expire: undefined,
      dir: undefined,
      host: undefined,
    },
    length: 0,
  };

  async componentDidMount() {
    await this.init();
  }

  // eslint-disable-next-line react/sort-comp
  init = async () => {
    try {
      const OSSData = await this.mockGetOSSData();

      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };

  // Mock get OSS api
  // https://help.aliyun.com/document_detail/31988.html
  mockGetOSSData = () => {
    const policyText = {
      expiration: '2021-11-01T12:00:00.000Z', // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
      conditions: [
        ['content-length-range', 0, 3048576000], // 设置上传文件的大小限制
      ],
    };
    const accesskey = 'njJ2rvFXBEtF8U28YRYVSk8H3oEFG1'; // 不要泄露
    // eslint-disable-next-line global-require
    const base64 = require('base-64');
    const policyBase64 = base64.encode(JSON.stringify(policyText));
    // eslint-disable-next-line global-require
    const CryptoJS = require('crypto-js');
    const bytes = CryptoJS.HmacSHA1(policyBase64, accesskey, { asBytes: true });
    const signature = bytes.toString(CryptoJS.enc.Base64);

    return {
      dir: 'images/', // bucket中的路径
      expire: '1577811661', // 有效时间戳'1577811661',
      host: 'https://proj-mural.oss-cn-shanghai.aliyuncs.com',
      accessId: 'LTAI4GA8GduXd1Ct1opmhJbE',
      policy: policyBase64, // you
      signature,
    };
  };

  // @ts-ignore
  onChange = ({ fileList }) => {
    // @ts-ignore
    // eslint-disable-next-line react/prop-types
    const { onChange } = this.props;
    console.log('Aliyun OSS:', fileList);
    if (onChange) {
      onChange([...fileList]);
    }
    // eslint-disable-next-line react/destructuring-assignment
    if (fileList.length > this.state.length) {
      this.state.length = fileList.length;
      const myUrl = `https://proj-mural.oss-cn-shanghai.aliyuncs.com/${fileList[fileList.length - 1].originFileObj.url}`;
      setTimeout(() => {
        const image = new Image();
        image.src = myUrl;
        image.onload = () => {
          const ratio = image.width / image.height;
          addShape({
            width: 200 * ratio,
            height: 200,
            x: 300,
            y: 300,
            type: 'IMAGE',
            url: myUrl,
            rotation: 0,
            draggable: true,
          });
        };
      }, 1000);
    }
  };

  onRemove = (file: any) => {
    // @ts-ignore
    // eslint-disable-next-line react/prop-types
    const { value, onChange } = this.props;

    // eslint-disable-next-line react/prop-types
    const files = value.filter((v: any) => v.url !== file.url);
    if (onChange) {
      onChange(files);
    }
  };

  getExtraData = (file: any) => {
    const { OSSData } = this.state;

    return {
      key: file.url,
      OSSAccessKeyId: OSSData.accessId,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  beforeUpload = async (file: any) => {
    const { OSSData } = this.state;
    // @ts-ignore
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await this.init();
    }

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    // eslint-disable-next-line no-param-reassign
    file.url = OSSData.dir + filename;

    return file;
  };

  // eslint-disable-next-line class-methods-use-this
  getBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  render() {
    // @ts-ignore
    // eslint-disable-next-line react/prop-types
    const { value } = this.props;
    const props = {
      name: 'file',
      fileList: value,
      // eslint-disable-next-line react/destructuring-assignment
      action: this.state.OSSData.host,
      onChange: this.onChange,
      onRemove: this.onRemove,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
      showUploadList: false,
    };
    return (
      <Upload {...props}>
        <Icon
          className="tool_icon"
          iconName="PictureFill"
          style={{ fontSize: '30px', margin: 'auto' }}
        />
      </Upload>
    );
  }
}
const AddImage: React.FC<{}> = () => {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  return (
    // eslint-disable-next-line object-curly-newline
    <div
      className="tool_icon"
      onClick={() => {
        const ops = state.OpList;
        ops.push(JSON.stringify(doc.data.shapes));
        dispatch({ type: 'setOpList', payload: ops });
      }}
    >
      <AliyunOSSUpload />
    </div>
  );
};
export default AddImage;
