import React from 'react';
import {
  Avatar, Popover, Card,
} from 'antd';
import { Icon } from '@fluentui/react/lib/Icon';
import useUserList from '../../hook/userList';
import './avatar_user.scss';

const AvatarUser: React.FC = () => {
  const [userList] = useUserList([]);
  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  const gridStyle:any = {
    width: '33%',
    textAlign: 'center',
  };

  const list = () => (
    <div className="userList" style={{ height: userList.length > 3 ? '200px' : '100px' }}>
      <Card>
        {
            userList.map((item) => (
              <Card.Grid style={gridStyle}>
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
              </Card.Grid>
            ))
          }
      </Card>
    </div>
  );

  return (
    <div className="usersGroup">
      <Popover placement="bottom" content={list} trigger="hover">
        <Icon iconName="Group" />
      </Popover>
    </div>
  );
};

export default AvatarUser;
