import doc from '../client/client';

function addObject(object: BaseShapes.Object) {
  console.log(doc);
  doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: object }]);
}

export default addObject;
