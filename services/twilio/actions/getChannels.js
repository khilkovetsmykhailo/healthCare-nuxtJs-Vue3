import getTwilioClient from '../service'

export default async (storage) => {
  const client = await getTwilioClient(storage)

  try {
    return await client.getUserChannelDescriptors()
    // const channelDescriptors = await client.getUserChannelDescriptors()
    // return channelDescriptors.state.items.map((channelDescriptor) => ({
    //   id: channelDescriptor.sid,
    //   name: channelDescriptor.friendlyName,
    //   uniqueName: channelDescriptor.uniqueName,
    // }))
  } catch (error) {
    console.error('Could not get current organization user\'s Twilio channels')
    return null
  }
}
