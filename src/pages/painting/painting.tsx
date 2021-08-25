import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import PaitingContent from '../../components/painting_content/painting_content';
import doc, { addSubscrible } from '../../client/client';
import axios from '../../utils/axios';
import { addUser, removeUser } from '../../utils/user_function';
import { useStateStore } from '../../store/store';

const Painting: React.FC<{}> = () => {
  const history = useHistory();
  const state = useStateStore();
  useEffect(() => {
    console.log(doc);
    axios.post('/api/doc', {
      type: 'get',
      data: {
        microsoft_id: 'test',
        canvas_id: doc.id,
      },
    }).then((res) => {
      if (res.data.msg === 'ok') {
        if (res.data.data.canvas_exist === false) {
          history.push('/404');
        } else {
          addSubscrible(() => {
            const user: BaseShapes.User = {
              x: 0,
              y: 0,
              ...state.userInfo,
            };
            addUser(user);
            window.onbeforeunload = () => {
              removeUser(user);
            };
          });
        }
      }
    });
  }, []);
  return (
    <div className="paiting">
      <PaitingContent />
    </div>
  );
};
export default Painting;
