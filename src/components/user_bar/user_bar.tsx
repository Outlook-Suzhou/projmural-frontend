import React from 'react';
import doc from '../../client/client';
import useUserList from '../../hook/userList';

interface UserInfo {
  name: string
  microsoftId: string
  mail: string
}
const UserBar: React.FC<{}> = () => {
  const [userList] = useUserList([]);
  console.log(doc);
  return (
    <div
      className="user_bar"
    >
      {
        userList.map((item: UserInfo) => (
          <span className="avatar_name">
            {item.name}
          </span>
        ))
    }
    </div>
  );
};
export default UserBar;
