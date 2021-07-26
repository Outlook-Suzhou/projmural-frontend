import doc from '../client/client';

function addEllipse(ellipse: any) {
  console.log(doc);
  doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: ellipse }]);
}

export default addEllipse;
