import React, { useState } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { message, Modal } from 'antd';
import deleteAll from '../../../utils/delete_function';

const DeleteAll: React.FC<{}> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    deleteAll();
    message.info('All cleared');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="tool_icon">
      <Icon
        iconName="ClearSelectionMirrored"
        onClick={showModal}
      />
      <Modal title="WARNING" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="clear" cancelText="cancel">
        <p>Are you sure to clear all the elements?</p>
      </Modal>
    </div>
  );
};

export default DeleteAll;
