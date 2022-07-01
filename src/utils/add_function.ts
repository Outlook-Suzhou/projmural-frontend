import getCurrentDoc from '../client/client';

const doc = getCurrentDoc();
function addShape(shape: BaseShapes.Shape) {
  // console.log(doc);
  doc.value.submitOp([{ p: ['shapes', doc.value.data.shapes.length], li: shape }]);
}

export default addShape;
