import doc from '../client/client';

function deleteAll() {
  doc.submitOp([{ p: ['shapes'], od: doc.data.shapes, oi: [] }]);
}

export default deleteAll;
