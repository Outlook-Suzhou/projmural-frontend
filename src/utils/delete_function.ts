function deleteAll(doc: any) {
  doc.value.submitOp([{ p: ['shapes'], od: doc.value.data.shapes, oi: [] }]);
}

export default deleteAll;
