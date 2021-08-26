import React, { useState } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { message, Modal } from 'antd';
import deleteAll from '../../../utils/delete_function';
import { useDispatchStore } from '../../../store/store';

const DeleteAll: React.FC<{}> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatchStore();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch({ type: 'setSelectShape', payload: 'FREE' });
    dispatch({ type: 'setCurrentIndex', payload: -1 });
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
