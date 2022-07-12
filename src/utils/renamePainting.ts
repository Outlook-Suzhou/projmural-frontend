import axios from './axios';

const renamePainting = (microsoftId: String, canvasName: String, canvasId: String) => {
  axios.post('/api/doc', {
    type: 'rename',
    data: {
      microsoft_id: microsoftId,
      canvas_name: canvasName,
      canvas_id: canvasId,
    },
  }).then((res) => {
    console.log(res);
    if (res.data.retc !== 0) {
      return false;
    }
    return true;
  }).catch((e) => {
    console.log(e);
    return false;
  });
};

export default renamePainting;
