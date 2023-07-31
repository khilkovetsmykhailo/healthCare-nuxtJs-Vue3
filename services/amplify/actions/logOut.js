import {Auth} from '../service'
import removeAuthToken from '../../../util/auth/removeAuthToken'

export default async (storage) => {
  try {
    await Auth.signOut()
    removeAuthToken(storage)
    storage.remove('authUserId')
  } catch (error) {
    console.error(error)
  }
}
