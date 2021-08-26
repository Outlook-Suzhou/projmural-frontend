import getCurrentDoc from '../client/client';

const doc = getCurrentDoc();
function addShape(shape: BaseShapes.Shape) {
  console.log(doc);
  doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: shape }]);
}

export default addShape;
