export const SERVER_URL = 'http://emall.shopping/';
export const API = SERVER_URL + 'api/Product/';

/**
 gets body returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          body from the request
 */
const getBody = response => {
  if (response.Result === null) {
    const error = new Error(response.message);
    throw error;
  }
  return response.Result;
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response.response;
  }

  const error = new Error(response);
  throw error;
};

const request = url =>
  fetch(`${API}/${url}`)
    .then(response => response.json())
    .then(response => response.Result);

export const fetchGroups = (parentId = 0) => request(`GetProductGroups?parentId=` + parentId);
export const fetchProducts = (groupId, pageNum = 1, size = 10) =>
  request(`GetProducts?groupId=${groupId}&pageNum=${pageNum}&size=${size}`).then(res => res.List);
export const getProduct = productId => request(`GetProduct?productId=${productId}`);
export const getAddress = (productId, supplierId) =>
  request(`GetSupplierProductAdress?productId=${productId}&supplierId=${supplierId}`);
export const getImages = productId => request(`GetImageNames?idProduct=${productId}`);
export const generateCode = (productId, userId) => request(`GenerateCode?productId=${productId}&userId=${userId}`);
export const getGeneratedCodes = userId => request(`GetGeneratedDiscountCodes?userId=${userId}`);
export const auth = (userName, password) => request(`Login?userName=${userName}&password=${password}`);
export const insertLogs = (groupId, customerId) =>
  request(`InsertProductGroupsLog?groupId=${groupId}&customerId=${customerId}`);
