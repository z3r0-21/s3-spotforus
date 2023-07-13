import axios from 'axios'

export const Auth0Api = axios.create({
  baseURL: ``,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '
  }
});




  