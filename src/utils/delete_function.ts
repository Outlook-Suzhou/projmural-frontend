import getCurrentDoc from '../client/client';

const doc = getCurrentDoc();
function deleteAll() {
  doc.value.submitOp([{ p: ['shapes'], od: doc.value.data.shapes, oi: [] }]);
}

export default deleteAll;
