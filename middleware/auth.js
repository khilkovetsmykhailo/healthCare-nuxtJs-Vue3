import isAuthUrl from '../util/auth/isAuthUrl'
import getAuthToken from '../util/auth/getAuthToken'

export default async ({ redirect, route, app }) => {
  if (isAuthUrl(route.path)) return

  const authToken = getAuthToken(app.$cookies)

  if (!authToken) {
    app.$cookies.set('loginRedirect', route.path)
    return redirect('/login')
  }
}
