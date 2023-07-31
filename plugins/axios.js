import isAuthUrl from '../util/auth/isAuthUrl'
import getAuthToken from '../util/auth/getAuthToken'

export default async ({ redirect, route, app, $config, $axios }) => {
  // Set baseURL from runtime config
  $axios.defaults.baseURL = $config.apiUrl

  if (isAuthUrl(route.path)) return

  const authToken = getAuthToken(app.$cookies)

  if (!authToken) {
    return
  }

  // Logged in, set axios interceptors
  $axios.onRequest((axiosConfig) => {
    if (authToken) {
      axiosConfig.headers.Authorization = `Bearer ${authToken}`
    } else {
      app.$cookies.set('loginRedirect', route.path)
      return redirect('/login')
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status, 10)

    // Authentication has expired
    if (code === 401) {
      app.$cookies.set('loginRedirect', route.path)
      return redirect('/login')
    }
  })
}
