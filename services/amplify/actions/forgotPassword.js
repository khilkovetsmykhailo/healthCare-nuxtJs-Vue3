import {Auth} from '../service'

export default async (username) => {
  const ctx = {
    success: false,
    error: null,
  }

  try {
    await Auth.forgotPassword(username)
    ctx.success = true
  } catch (error) {
    console.error(error)
    ctx.error = error.message
  }

  return ctx
}
