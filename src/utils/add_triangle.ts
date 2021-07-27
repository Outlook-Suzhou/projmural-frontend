import doc from '../client/client';

function addTriangle(triangle: BaseShapes.Triangle) {
  console.log(doc);
  doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: triangle }]);
}

export default addTriangle;
