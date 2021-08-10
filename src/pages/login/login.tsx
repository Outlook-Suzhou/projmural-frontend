import React, { useState } from 'react';
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
        <Content>
          { !graphData.empty
            ? (
              <div id="profile-div">
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
            )
            : null }
          {
            graphData.empty && isAuthenticated ? (
              <button type="button" onClick={() => requestProfileData()}>
                Request Information
              </button>
            ) : null
          }
        </Content>
        <Footer>
          Footer
        </Footer>
      </Layout>
    </div>
  );
};

export default Login;
