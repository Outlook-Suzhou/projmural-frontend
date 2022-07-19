function addShape(shape: BaseShapes.Shape, doc: any) {
  // console.log(doc);
  doc.value.submitOp([{ p: ['shapes', doc.value.data.shapes.length], li: shape }]);
}

export default addShape;
