import isAuthUrl from '../util/auth/isAuthUrl'
import getAuthToken from '../util/auth/getAuthToken'
import handleGetTwilioToken from '../util/twilio/handleGetToken'

export default async ({ app, store, route, $axios }) => {
  if (isAuthUrl(route.path) || !getAuthToken(app.$cookies)) return

  const currentUser = store.state.currentUser.user
  if (!currentUser) return

  await handleGetTwilioToken($axios, app.$cookies, currentUser.email)
}
