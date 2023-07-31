import isAuthUrl from '../util/auth/isAuthUrl'
import getAuthToken from '../util/auth/getAuthToken'

export default async ({ store, route, app }) => {
  if (isAuthUrl(route.path) || !getAuthToken(app.$cookies)) return

  // Get current user chat channels
  store.dispatch('chat/INIT_CHAT')
}
