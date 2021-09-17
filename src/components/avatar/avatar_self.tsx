import React from 'react';
import {
  Avatar, Dropdown, Menu,
} from 'antd';
import { useMsal } from '@azure/msal-react';
import { useStateStore } from '../../store/store';
import './avatar_self.scss';

const AvatarArea : React.FC = () => {
  const { instance } = useMsal();
  const state = useStateStore();
  const logoutFunction = () => { instance.logoutRedirect({ postLogoutRedirectUri: '/' }); };
  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  const DropdownMenu = (
    <Menu>
      <Menu.Item key="1" onClick={logoutFunction}>
        logout
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="avatar">
      <Dropdown overlay={DropdownMenu} trigger={['hover']}>
        <Avatar
          size={40}
          style={{
            backgroundColor: ColorList[parseInt(state.userInfo.microsoftId.substr(-1), 16) % 4],
            verticalAlign: 'middle',
            cursor: 'pointer',
          }}
        >
          {state.userInfo.name.split(' ').pop()}
        </Avatar>
      </Dropdown>
    </div>
  );
};

export default AvatarArea;
