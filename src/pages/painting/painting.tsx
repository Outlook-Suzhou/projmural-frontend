import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import PaitingContent from '../../components/painting_content/painting_content';
import doc from '../../client/client';
import axios from '../../utils/axios';

const Painting: React.FC<{}> = () => {
  const history = useHistory();
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
          window.onbeforeunload = () => {
          };
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
