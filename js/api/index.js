async function fetchGetMenuItems() {
  // const response = await fetch('http://localhost:3000/menu-items');
  const response = await fetch('https://my-json-server.typicode.com/eofzzang/newall/db');

  const data = await response.json()

  const result = data['menu-items'];
  return result;
}

async function fetchGetRecentOrders() {
  // const response = await fetch('http://localhost:3000/recent-orders');
  const response = await fetch('https://my-json-server.typicode.com/eofzzang/newall/db');

  const data = await response.json()
  
  const result = data['recent-orders'];
  return result;
}

async function fetchGetGroupList() {
  // const response = await fetch('http://localhost:3000/menu-groups');
  const response = await fetch('https://my-json-server.typicode.com/eofzzang/newall/db');

  const data = await response.json()
  
  const result = data['menu-groups'];
  return result;
}

async function fetchGetMenu(menuId) {
  // const response = await fetch('http://localhost:3000/menu/?id=' + menuId);
  const response = await fetch('https://my-json-server.typicode.com/eofzzang/newall/db');

  const data = await response.json()
  
  const result = data['menu'].find(x=>x.id == menuId)
  return result;
}

async function fetchGetAgreementList() {
  // const response = await fetch('http://localhost:3000/agreement-list');
  const response = await fetch('https://my-json-server.typicode.com/eofzzang/newall/db');

  const data = await response.json()
  
  const result = data['agreement-list'];
  return result;
}

export { fetchGetMenuItems, fetchGetRecentOrders, fetchGetGroupList, fetchGetMenu, fetchGetAgreementList };