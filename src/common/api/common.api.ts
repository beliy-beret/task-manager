import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'bcd79d4b-8796-4ac6-ac09-f3bbfbbc1e58',
  },
})
