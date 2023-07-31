import isAuthUrl from '../util/auth/isAuthUrl'
import getAuthToken from '../util/auth/getAuthToken'

export default async ({ store, route, app }) => {
  if (isAuthUrl(route.path) || !getAuthToken(app.$cookies)) return

  if (!store.state.static.retrieved) {
    await store.dispatch('static/GET_ALL')
  }
}
