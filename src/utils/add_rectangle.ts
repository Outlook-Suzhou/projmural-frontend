import doc from '../client/client';

function addRectangle(rectangle: BaseShapes.Rectangle) {
  console.log(doc);
  doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: rectangle }]);
}

export default addRectangle;
