import axios from 'axios'

// deveopment env base url
export const baseURL = "http://localhost:8000/api"

// production env base url
// export const baseURL = /"https://axumhub.herokuapp.com/api"

const Api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default Api;