import React from 'react';
import {
  Avatar,
} from 'antd';
import useUserList from '../../hook/userList';

const AvatarUser: React.FC = () => {
  const [userList] = useUserList([]);
  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  return (
    <>
      {
        userList.map((item) => (
          <Avatar
            size={40}
            style={{
              backgroundColor: ColorList[parseInt(item.microsoftId.substr(-1), 16) % 4],
              verticalAlign: 'middle',
              cursor: 'pointer',
            }}
          >
            {item.name.split(' ').pop()}
          </Avatar>
        ))
      }
    </>
  );
};

export default AvatarUser;
