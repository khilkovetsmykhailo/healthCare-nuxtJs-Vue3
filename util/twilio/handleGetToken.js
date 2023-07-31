import jwtDecode from 'jwt-decode'
import getTwilioToken from './getToken'
import fetchTwilioToken from './fetchToken'
import setTwilioToken from './setToken'

export default async (ctx, storage, identity) => {
  let token = getTwilioToken(storage)

  // None in storage, get one
  if (!token) token = await fetchTwilioToken(ctx, identity)
  if (!token) return false

  // Check for expiry, and fetch if expired
  try {
    const { exp } = jwtDecode(token)
    if (Date.now() > exp * 1000) {
      token = await fetchTwilioToken(ctx, identity)
    }
  } catch (error) {
    console.error('Error in decoding/getting new Twilio token:', error)
  }

  if (!token) return false
  setTwilioToken(storage, token)
  return true
}
