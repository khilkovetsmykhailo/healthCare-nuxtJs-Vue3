import {getChannels} from '../services/twilio'
import makeRequest from '../util/graphql/makeRequest'
import extractNodes from '../util/graphql/extractNodes'
import queryUsers from '../graphql/queries/user/users'

const getDemoUsers = async (ctx, emails) => {
  const { data, errors } = await makeRequest(ctx, {
    query: queryUsers,
    variables: {
      includeEmails: emails,
    },
  })

  if (errors.length) {
    console.error('Could not load Demo users for Twilio chat channel members sync.')
  } else {
    return extractNodes(data.users)
  }
}

const twilioChatChannels = {}
const twilioChatChannelMembers = {}

export const state = () => ({
  channels: null,
  initializing: false,
  error: null,
})

export const mutations = {
  _SET(_state, [which, what]) {
    _state[which] = what
  },

  ADD_CHANNEL_MESSAGE(_state, [channelId, message]) {
    _state.channels = _state.channels.map((channel) => (
      channel.id === channelId
        ? {
          ...channel,
          messages: {
            items: channel.messages.items.concat({
              id: message.state.sid,
              timestamp: message.state.timestamp,
              author: message.state.author,
              body: message.state.body,
            }),
          },
        }
        : channel
    ))
  },

  SET_CHANNEL_MESSAGES(_state, [channelId, messages]) {
    _state.channels = _state.channels.map((channel) => {
      if (channelId === channel.id) channel.messages = {
        items: messages.items.map((message) => ({
          id: message.state.sid,
          timestamp: message.state.timestamp,
          author: message.state.author,
          body: message.state.body,
        })),
        hasNextPage: messages.hasNextPage,
      }
      return channel
    })
  },
}

export const actions = {
  async GET_CHANNEL_MESSAGES({ commit }, chatChannelId) {
    try {
      commit('SET_CHANNEL_MESSAGES', [chatChannelId, await twilioChatChannels[chatChannelId].getMessages()])
    } catch (error) {
      console.error('Could not get Twilio messages.', error)
    }
  },

  async SEND_MESSAGE({ commit }, [chatChannelId, message]) {
    try {
      await twilioChatChannels[chatChannelId].sendMessage(message)
    } catch (error) {
      console.error('Could not send Twilio message.', error)
    }
  },

  async INIT_CHAT({ commit }) {
    commit('_SET', ['initializing', true])
    commit('_SET', ['error', null])

    try {
      const channelsResponse = await getChannels(this.$cookies)
      const DemoUsers = []

      // Get channel instances and store them outside of the store (to prevent store mutations)
      await Promise.all(channelsResponse.state.items.map(async (channel) => {
        const fetchedChannel = await channel.getChannel()
        twilioChatChannels[channel.sid] = fetchedChannel
        const fetchedMembers = await fetchedChannel.getMembers()
        twilioChatChannelMembers[channel.sid] = fetchedMembers

        // Get all Demo API users
        const users = await getDemoUsers(
          this.$axios,
          fetchedMembers.map((member) => member.state.identity),
        )
        DemoUsers.push(...users)

        // Subscribe to events
        fetchedChannel.on('messageAdded', (message) => {
          commit('ADD_CHANNEL_MESSAGE', [channel.sid, message])
        })

        // TODO member joined, get Demo user
        // fetchedChannel.on('memberJoined', (member) => {
        // })

        // TODO more twilio event subscriptions
      }))

      // Set channel data
      commit(
        '_SET',
        [
          'channels',
          channelsResponse.state.items.map((channel) => ({
            id: channel.sid,
            name: channel.friendlyName,
            members: twilioChatChannelMembers[channel.sid].map((member) => ({
              id: member.state.sid,
              identity: member.state.identity,
              isTyping: member.state.isTyping,
              user: DemoUsers.find(({ email }) => email === member.state.identity),
            })),
            messages: null,
          })),
        ],
      )
    } catch (error) {
      console.error('Error initializing user chat.', error)
      commit('_SET', ['error', error])
    }

    commit('_SET', ['initializing', false])
  },
}
