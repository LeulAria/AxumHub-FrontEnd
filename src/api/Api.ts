import axios from 'axios'

// deveopment env base url
export const baseURL = "http://localhost:8000/api"

const Api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default Api;