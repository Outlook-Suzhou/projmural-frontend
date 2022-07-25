import getCurrentDoc from '../client/client';

function addUser(user: BaseShapes.User, docObj?: any) {
  const doc = docObj || getCurrentDoc();
  doc.value.submitOp([{ p: ['users', doc.value.data.users.length], li: user }]);
}
function editUser(user: BaseShapes.User, index: number, docObj?: any) {
  const doc = docObj || getCurrentDoc();
  doc.value.submitOp([{ p: ['users', index], ld: doc.value.data.users[index], li: user }]);
}
function removeUser(user: BaseShapes.User, docObj?: any) {
  const doc = docObj || getCurrentDoc();
  doc.value.data.users.forEach((item: BaseShapes.User, index: number) => {
    if (item.microsoftId === user.microsoftId) {
      doc.value.submitOp([{ p: ['users', index], ld: item }]);
    }
  });
}
function userExist(user: BaseShapes.User, docObj?: any) {
  const doc = docObj || getCurrentDoc();
  return doc.value.data.users.some((item: BaseShapes.User) => item.microsoftId === user.microsoftId);
}
export {
  addUser, removeUser, editUser, userExist,
};
