import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from '../../config/auth_config';
import LoginHeader from '../../components/login_page/login_header';
import './login.scss';
import axios from '../../utils/axios';
import { useDispatchStore } from '../../store/store';

const { Header, Content, Footer } = Layout;

const Login: React.FC<{}> = () => {
  const isAuthenticated = useIsAuthenticated();
  const [loading, setLoading] = useState(false);
  const { instance, accounts } = useMsal();
  const history = useHistory();
  const jumpToDashboard = () => {
    history.push('/dashboard');
  };
  const dispatch = useDispatchStore();
  useEffect(() => {
    if (isAuthenticated === false) return;
    instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0],
    }).then((graphResponse: any) => {
      setLoading(true);
      axios.post('/api/login', {
        access_token: graphResponse.accessToken,
      }).then((loginResponse: any) => {
        if (loginResponse.data.retc === 0) {
          localStorage.setItem('projmural_jwt', loginResponse.data.data.jwt);
          axios.get('/api/currentUser').then((rsp: any) => {
            dispatch({
              type: 'setUserInfo',
              payload: {
                microsoftId: rsp.data.data.microsoft_id,
                name: rsp.data.data.name,
                mail: rsp.data.data.mail,
                canvas: rsp.data.data.canvas.map((val: any) => ({
                  id: val.id,
                  name: val.name,
                  recentOpen: val.recent_open,
                })),
                recentCanvas: (rsp.data.data.recent_canvas || []).map((val: any) => ({
                  id: val.id,
                  name: val.name,
                  recentOpen: val.recent_open,
                })),
              },
            });
            setLoading(false);
            jumpToDashboard();
          }).catch((err: any) => { console.log(err); });
        } else {
          console.log(loginResponse.data.msg);
        }
      });
    });
  }, [isAuthenticated]);
  const handleSignIn = () => {
    instance.loginRedirect(loginRequest).catch((err: any) => { console.log(err); });
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
        <Spin spinning={loading}>
          <Content className="content">
            <div className="banner" />
          </Content>
        </Spin>
        <Footer className="footer">
          <small>
            <p>Microsoft Outlook Team</p>
            <p>Intern Project</p>
            <p>2022.6 - 2022.9</p>
          </small>
        </Footer>
      </Layout>
    </div>
  );
};

export default Login;
