import React, { useState } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { Modal } from 'antd';
import deleteAll from '../../../utils/delete_function';

const DeleteAll: React.FC<{}> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    deleteAll();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="tool_icon">
      <Icon
        style={{ fontSize: '40px', margin: 'auto' }}
        iconName="ClearSelectionMirrored"
        onClick={showModal}
      />
      <Modal title="警告" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>这将会删除画板中的所有元素，你确定吗？</p>
      </Modal>
    </div>
  );
};

export default DeleteAll;
