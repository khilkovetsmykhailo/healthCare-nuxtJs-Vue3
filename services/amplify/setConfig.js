import Amplify from 'aws-amplify'

export default (config) => {
  Amplify.configure({
    Auth: config.Auth,
    Storage: config.Storage,
  })
}
