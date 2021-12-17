import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getCookie } from './getCookie'

const axiosSpotifyInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${getCookie('access_token')}`
  }
})

axiosSpotifyInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (!getCookie('access_token')) { // access token expired
    window.location.href = '/api/v1/refresh'
  }
  return config
})

axiosSpotifyInstance.interceptors.response.use(async (response: AxiosResponse) => {
  if (response.status === 401) {
    window.location.href = '/api/v1/login'
  }

  return response
}, async (error: AxiosError) => {
  if (error.response?.status === 429) {
    if (error.response.headers['retry-after']) {
      console.log('rate limited please be patient for ' + error.response.headers['retry-after'] + ' seconds.')
      // eslint-disable-next-line promise/param-names
      await new Promise(r => setTimeout(r, Number(error.response?.headers['retry-after'])))
    } else {
      console.log('rate limited for an undefined amount of time. Please be patient for 5 seconds')
      // eslint-disable-next-line promise/param-names
      await new Promise(r => setTimeout(r, 5))
    }
    return axiosSpotifyInstance.request(error.response.config)
  }
})

export { axiosSpotifyInstance }
