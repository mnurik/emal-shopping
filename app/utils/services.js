export const SERVER_URL = 'http://emall.shopping/api/Product/'

/**
 gets body returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          body from the request
 */
const getBody = response => {
  if (response.Result === null) {
    const error = new Error(response.message)
    throw error
  }
  return response.Result
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response.response
  }

  const error = new Error(response)
  throw error
}

const request = url =>
  fetch(`${SERVER_URL}/${url}`)
    .then(response => response.json())
    .then(response => response.Result)

export const fetchProducts = (parent = 0) => request('GetProductGroups?parentId=' + parent)

export const auth = (userName, password) => request(`Login?userName=${userName}&password=${password}`)
