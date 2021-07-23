import doc from '../client/client';

function addRectangle(rectangle: any) {
  doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: rectangle }]);
}

export default addRectangle;
