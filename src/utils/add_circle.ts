import doc from '../client/client';

function addCircle(circle: any) {
  console.log(doc);
  doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: circle }]);
}

export default addCircle;
