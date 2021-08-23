import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from '../../config/auth_config';
import { callMsGraph } from '../../config/graph';
import LoginHeader from '../../components/login_page/login_header';
import './login.scss';

const { Header, Content, Footer } = Layout;

const Login: React.FC<{}> = () => {
  const [graphData, setGraphData] = useState({
    givenName: '',
    surname: '',
    userPrincipalName: '',
    id: '',
    empty: true,
  });
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const history = useHistory();
  const requestProfileData = () => {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0],
    }).then((response: any) => {
      callMsGraph(response.accessToken).then((res) => setGraphData(res));
    });
  };
  const handleSignIn = () => {
    instance.loginRedirect(loginRequest).catch((e: any) => {
      console.log(`login error ${e}`);
    });
  };
  const handleSignOut = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: '/',
    });
  };
  const goToPainting = () => {
    history.push('/dashboard');
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
          <div className="pic">
            { !graphData.empty
              ? (
                <div id="profile-div">
                  <div className="info">
                    <p>
                      <strong>First Name: </strong>
                      {' '}
                      {graphData.givenName}
                    </p>
                    <p>
                      <strong>Last Name: </strong>
                      {' '}
                      {graphData.surname}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {' '}
                      {graphData.userPrincipalName}
                    </p>
                    <p>
                      <strong>Id: </strong>
                      {' '}
                      {graphData.id}
                    </p>
                  </div>
                  <button className="goToDash" type="button" onClick={goToPainting}>
                    Go to Dashboard
                  </button>
                </div>
              )
              : null }
            {
              graphData.empty && isAuthenticated ? (
                <button className="getInfo" type="button" onClick={() => requestProfileData()}>
                  Request Info
                </button>
              ) : null
            }
          </div>
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
