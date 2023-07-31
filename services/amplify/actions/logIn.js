import {Auth} from '../service'
import setAuthToken from '../../../util/auth/setAuthToken'

export default async (username, password, storage) => {
  try {
    const user = await Auth.signIn(username, password)
    if (user.challengeName) {
      return {
        user,
        challenge: {name: user.challengeName, param: user.challengeParam},
        error: null,
      }
    } else {
      const userToken = user.signInUserSession.accessToken.jwtToken
      setAuthToken(storage, userToken)
      storage.set('authUserId', user.username)
      return {
        user,
        userToken,
        error: null,
      }
    }
  } catch (error) {
    // -- UserNotConfirmedException:
    //      The error happens if the user didn't finish the confirmation step when signing up
    //      In this case you need to resend the code and confirm the user
    //      About how to resend the code and confirm the user, please check the signUp part
    // -- PasswordResetRequiredException:
    //      The error happens when the password is reset in the Cognito console
    //      In this case you need to call forgotPassword to reset the password
    //      Please check the Forgot Password part.
    // -- NotAuthorizedException:
    //      The error happens when the incorrect password is provided
    // -- UserNotFoundException:
    //      The error happens when the supplied username/email does not exist in the Cognito user pool
    return {
      error,
      userToken: null,
      user: null,
    }
  }
}
