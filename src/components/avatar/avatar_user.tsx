import React from 'react';
import {
  Avatar, List, Popover,
} from 'antd';
import { Icon } from '@fluentui/react/lib/Icon';
import useUserList from '../../hook/userList';
import './avatar_user.scss';

const AvatarUser: React.FC = () => {
  const [userList] = useUserList([]);
  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

  const list = () => (
    <div className="userList">
      <List
        dataSource={userList}
        renderItem={(item) => (
          <List.Item key={item.microsoftId}>
            <List.Item.Meta
              avatar={(
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
                    )}
            />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <div className="usersGroup">
      <Popover placement="right" content={list} trigger="hover">
        <Icon iconName="Group" />
      </Popover>
    </div>
  );
};

export default AvatarUser;
