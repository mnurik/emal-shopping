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

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
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
  request(`GetProducts?groupId=${groupId}&pageNum=${pageNum}&size=${size}`);

export const getProduct = productId => request(`GetProduct?productId=${productId}`);
export const getAddress = (productId, supplierId) =>
  request(`GetSupplierProductAdress?productId=${productId}&supplierId=${supplierId}`);

export const auth = (userName, password) => request(`Login?userName=${userName}&password=${password}`);
