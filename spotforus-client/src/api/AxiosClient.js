import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: `http://localhost/api`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});




  