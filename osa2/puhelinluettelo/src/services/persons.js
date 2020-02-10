import axios from 'axios'
const baseUrl = 'https://mighty-cove-08198.herokuapp.com/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => {
    console.log('data', response)
    return response.data}
    )
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request
}

const deletePersonById = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request
}

export default { getAll, create, update, deletePersonById }