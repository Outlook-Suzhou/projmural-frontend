import React from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from '../../config/auth_config';
import LoginHeader from '../../components/login_page/login_header';
import './login.scss';
import axios from '../../utils/axios';
import { useDispatchStore } from '../../store/store';

const { Header, Content, Footer } = Layout;

const Login: React.FC<{}> = () => {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const history = useHistory();
  const handleSignIn = () => {
    instance.loginRedirect(loginRequest).catch((e: any) => {
      console.log(`login error ${e}`);
      instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      }).then((graphResponse: any) => {
        axios.post('/api/login', {
          access_token: graphResponse.accessToken,
        }).then((loginResponse: any) => {
          if (loginResponse.data.retc === 0) {
            localStorage.setItem('projmural_jwt', loginResponse.data.data.jwt);
            axios.get('/api/currentUser').then((rsp: any) => {
              const dispatch = useDispatchStore();
              dispatch({
                type: 'setUserInfo',
                payload: {
                  microsoftId: rsp.data.data.microsoft_id,
                  name: rsp.data.data.name,
                },
              });
              history.push('/dashboard');
            });
          } else {
            console.log(loginResponse.data.msg);
          }
        }).catch((err: any) => { console.log(err); });
      });
    });
  };
  const handleSignOut = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: '/',
    });
  };
  return (
    <div className="login_page">
      <Layout>
        <Header>
          <LoginHeader
            handleSignIn={handleSignIn}
            handleSignOut={handleSignOut}
            isAuthenticated={isAuthenticated}
          />
        </Header>
        <Content className="content">
          <div className="banner" />
        </Content>
        <Footer className="footer">
          <small>
            <p>Microsoft Outlook Team</p>
            <p>Intern Project</p>
            <p>2021.8</p>
          </small>
        </Footer>
      </Layout>
    </div>
  );
};

export default Login;
