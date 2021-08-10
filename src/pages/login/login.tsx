import React from 'react';
import { Layout } from 'antd';
import LoginHeader from '../../components/login_page/login_header';
import './login.scss';

const { Header, Content, Footer } = Layout;

const Login: React.FC<{}> = () => {
  const a = 1;
  console.log(a);
  return (
    <div className="login_page">
      <Layout>
        <Header>
          <LoginHeader />
        </Header>
        <Content>
          Content
        </Content>
        <Footer>
          Footer
        </Footer>
      </Layout>
    </div>
  );
};

export default Login;
