import setConfig from '../services/amplify/setConfig'

export default ({ $config }) => {
  setConfig({
    Auth: {
      region: $config.awsCognitoRegion,
      userPoolId: $config.awsCognitoUserPoolId,
      userPoolWebClientId: $config.awsCognitoClientId,
      identityPoolId: $config.awsCognitoIdentityPoolId,
    },
    Storage: {
      AWSS3: {
        bucket: $config.awsS3Bucket,
        region: $config.awsS3Region,
      },
    },
  })
}
