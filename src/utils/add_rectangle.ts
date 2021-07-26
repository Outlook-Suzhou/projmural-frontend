import doc from '../client/client';

function addRectangle(rectangle: baseShapes.RECTANGLE) {
  console.log(doc);
  doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: rectangle }]);
}

export default addRectangle;
