import doc from '../client/client';

function addShape(shape: BaseShapes.Shape) {
  console.log(doc);
  doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: shape }]);
}

export default addShape;
