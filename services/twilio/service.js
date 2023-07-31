import getToken from '../../util/twilio/getToken'

let client

export default async (storage) => {
  if (client) return client

  const token = await getToken(storage)
  if (!token) throw new Error('Attempt to use Twilio SDK without first setting token.')

  try {
    return Twilio.Chat.Client.create(token)
  } catch (error) {
    console.error(`Could not create Twilio chat client with token: ${token}`, error)
    return null
  }
}
