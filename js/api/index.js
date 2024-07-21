async function fetchGetRecentOrders() {
  const response = await fetch('http://localhost:3000/recent-orders');

  const data = await response.json()

  return data;
}

async function fetchGetGroupList() {
  const response = await fetch('http://localhost:3000/menu-groups');

  const data = await response.json()

  return data;
}

async function fetchGetMenu(menuId) {
  const response = await fetch('http://localhost:3000/menu/?id=' + menuId);

  const data = await response.json()

  return data;
}

async function fetchGetAgreementList() {
  const response = await fetch('http://localhost:3000/agreement-list');

  const data = await response.json()

  return data;
}

export { fetchGetRecentOrders, fetchGetGroupList, fetchGetMenu, fetchGetAgreementList };