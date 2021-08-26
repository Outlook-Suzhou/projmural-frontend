import getCurrentDoc from '../client/client';

const doc = getCurrentDoc();
function deleteAll() {
  doc.submitOp([{ p: ['shapes'], od: doc.data.shapes, oi: [] }]);
}

export default deleteAll;
