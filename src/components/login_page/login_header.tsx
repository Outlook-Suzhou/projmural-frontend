import React from 'react';
import { Menu } from 'antd';
import './login_header.scss';

interface Props {
  handleSignIn: any,
  handleSignOut: any,
  isAuthenticated: any,
}
const LoginHeader: React.FC<Props> = (props: Props) => {
  const { handleSignIn, handleSignOut, isAuthenticated } = props;
  return (
    <>
      <div className="logo">
        <Menu mode="horizontal" className="login_header_menu">
          <Menu.Item key={1}>
            <a href="https://www.microsoft.com/microsoft-365" target="_blank" rel="noopener noreferrer">
              Microsoft 365
            </a>
          </Menu.Item>
          <Menu.Item key={2}>
            <a href="https://www.microsoft.com/en-us/microsoft-365/microsoft-office" target="_blank" rel="noopener noreferrer">
              Office
            </a>
          </Menu.Item>
          <Menu.Item key={3}>
            <a href="https://www.microsoft.com/en-us/windows/" target="_blank" rel="noopener noreferrer">
              Windows
            </a>
          </Menu.Item>
          {
            !isAuthenticated
              ? <Menu.Item key={4} className="login_button" onClick={handleSignIn}>Sign In</Menu.Item>
              : <Menu.Item key={5} className="login_button" onClick={handleSignOut}>Sign Out</Menu.Item>
          }
        </Menu>
      </div>
    </>
  );
};

export default LoginHeader;
