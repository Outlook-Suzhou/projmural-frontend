import doc from '../client/client';

function addRectangle(rectangle: any) {
  console.log(doc);
  doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: rectangle }]);
}

export default addRectangle;
