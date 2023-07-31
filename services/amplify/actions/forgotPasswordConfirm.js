import {Auth} from '../service'

export default async (username, verification, newPassword) => {
  const ctx = {
    success: false,
    error: null,
  }

  try {
    await Auth.forgotPasswordSubmit(username, verification, newPassword)
    ctx.success = true
  } catch (error) {
    console.error(error)
    ctx.error = error.message
  }

  return ctx
}
