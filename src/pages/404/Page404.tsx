import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router';
// import LoginHeader from '../../components/login_page/login_header';

const Page404: React.FC<{}> = () => {
  const history = useHistory();
  const backHome = () => {
    history.push('/');
  };
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={() => backHome()}>Back Home</Button>}
      />
    </>
  );
};
export default Page404;
