import {Auth} from '../service'

export default async (user, password) => {
  try {
    await Auth.completeNewPassword(
      user,
      password,
    )
    return true;
  } catch (error) {
    console.error(error)
    return false;
  }
}
