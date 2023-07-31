<template>
  <b-card-body
    class="ex-chat-messages"
  >
    <b-alert
      v-if="error"
      variant="danger"
      show
    >
      {{ error }}
    </b-alert>

    {{ /* MESSAGES LIST */ }}
    <div
      v-if="messages !== null && messages.items.length > 0"
      ref="container"
      class="ex-chat-messages-container"
    >
      {{ /* LOAD MORE */ }}
      <template v-if="messages.hasNextPage">
        <b-button
          v-if="!loading"
          size="md"
          class="mx-auto d-block"
          @click="handleLoadMore"
        >
          Load More
        </b-button>

        <ex-loading
          v-if="loading"
          size="small"
        />
      </template>

      {{ /* NO MORE */ }}
      <div
        v-if="!messages.hasNextPage"
        class="small text-muted text-center"
      >
        Beginning of message history
      </div>

      <hr>

      {{ /* MESSAGES LIST */ }}
      <div
        v-for="message in messages.items"
        :key="message.sid"
        class="ex-message-group"
      >
        <div
          class="ex-message"
          :class="[getMessageReceivedSent(message)]"
        >
          <div class="small text-muted text-center mb-3">
          </div>

          <div class="ex-message-container row mx-0 align-items-center">
            <div
              class="small text-muted mx-2"
              :class="{'order-2': getMessageReceivedSent(message) === 'received'}"
            >
              {{ message.timestamp | formatDate }}
            </div>

            <div class="ex-message-content">
              {{ message.body }}
              <!--              <ex-file v-if="message.file" v-bind="message.file" fluid/>-->
            </div>
          </div>

          <div class="ex-message-author row mx-0 align-items-center">
            <ex-avatar>
              <!--              <ex-file-->
              <!--                v-if="message.user_organization_role.user.profile_picture_file"-->
              <!--                v-bind="message.user_organization_role.user.profile_picture_file"-->
              <!--                fluid-->
              <!--              />-->
              <span>
                {{ `${message.author.firstName.charAt(0)}${message.author.lastName.charAt(0)}` }}
              </span>
            </ex-avatar>

            <span class="ml-2">
              {{ `${message.author.firstName} ${message.author.lastName}` }}
            </span>
          </div>
        </div>
      </div>
    </div>

    {{ /* LOADING */ }}
    <div
      v-if="loading"
      class="ex-chat-messages-no-messages"
    >
      Loading Messages...
    </div>

    {{ /* NO MESSAGES */ }}
    <div
      v-if="messages !== null && messages.items.length === 0"
      class="ex-chat-messages-no-messages"
    >
      No Messages
    </div>

    {{ /* NEW MESSAGE */ }}
    <div
      v-if="canSendMessage"
      class="ex-chat-new-message row mx-0 align-items-top"
    >
      <b-textarea
        v-model="newMessageState"
        placeholder="Enter a message..."
        :disabled="sendingMessage"
        rows="5"
      />
      <div class="ex-chat-new-message-button-container ml-2">
        <ex-icon-button
          icon="paper-plane"
          font-awesome
          size="2x"
          :disabled="newMessageState === '' || sendingMessage"
          @click="handleSendMessage"
        />
        <ex-icon-button
          icon="plus"
          font-awesome
          size="2x"
          tooltip="Upload Image"
          @click="handleAddFile"
          class="mt-1"
        />
      </div>
    </div>
    <ex-file-modal
      id="message-files-modal"
      title="Upload Image File"
      description="Select an image to upload."
      :accept="imageFileTypes().map(type => `image/${type}`).toString()"
      @uploaded="getMessages"
    />
  </b-card-body>
</template>
<script>
import {mapState, mapActions} from 'vuex'

/*

BREAKPOINT
Media uploads to Twilio. Seems easy, just need to restore Demo file uploader
https://www.twilio.com/docs/chat/media-support
 */

export default {
  name: 'ex-step-chat-messages',
  computed: {
    currentChannelLoaded() {
      if (this.channels === null) return null
      return this.channels.find(({ id }) => id === this.currentChannel.id) || null
    },

    canSendMessage() {
      return this.currentChannelLoaded !== null
        ? this.currentChannelLoaded.members.find(({ identity }) => (
          identity !== this.currentUser.email
        ))
        : false
    },

    messages() {
      return this.currentChannelLoaded !== null && this.currentChannelLoaded.messages !== null
        ? ({
          ...this.currentChannelLoaded.messages,
          // Add message author
          items: this.currentChannelLoaded.messages.items.map((message) => ({
            ...message,
            author: this.getMessageAuthor(message.author),
          })),
        })
        : null
    },

    ...mapState('currentUser', {
      currentUser: 'user',
    }),
    ...mapState('organization/chat', ['currentChannel']),
    ...mapState('chat', ['channels']),
  },
  data() {
    return {
      loading: false,
      error: null,
      channel: null,
      sendingMessage: false,
      sendingMessageError: false,
      channelMembers: null,
      shouldScroll: true, // scroll initially on load
      newMessageState: '',
    }
  },
  mounted() {
    this.subscribeToStore({
      'chat/ADD_CHANNEL_MESSAGE': () => {
        this.$nextTick(() => {
          this.scrollToMostRecent()
        })
      },
    }, 'mutation')

    this.getMessages()
  },
  methods: {
    getMessageAuthor(authorIdentity) {
      const authorChannelMember = this.currentChannelLoaded.members.find(
        ({ identity }) => identity === authorIdentity,
      )
      if (!authorChannelMember) return { firstName: 'Unknown', lastName: 'Sender' }
      return { firstName: authorChannelMember.user.firstName, lastName: authorChannelMember.user.lastName }
    },

    async handleSendMessage() {
      this.sendingMessageError = null
      this.sendingMessage = true

      await this.sendMessage([this.currentChannel.id, this.newMessageState])

      this.newMessageState = ''
      this.sendingMessage = false
    },

    async getMessages() {
      this.error = null
      this.loading = true

      try {
        await this.getChannelMessages(this.currentChannel.id)
      } catch (error) {
        console.error('Error getting messages from Twilio.', error)
        this.error = 'Could not get Twilio messages'
      }

      this.scrollToMostRecent()
      this.loading = false
    },

    getMessageReceivedSent(message) {
      return 'sent'
    },

    scrollToMostRecent() {
      this.$refs.container.scrollTop = 999999
    },

    async handleLoadMore() {
    },

    handleAddFile() {
      this.busEmit('message-files-modal:start', {
        owner_type: 'users',
        owner_id: this.user?.id,
        message: {
          user_organization_role_id: this.currentUserOrganizationRole?.id,
          channel_id: this.channel?.id,
        },
      })
    },

    handleUploaded() {
      this.getMessages()
    },

    ...mapActions('chat', {
      sendMessage: 'SEND_MESSAGE',
      getChannelMessages: 'GET_CHANNEL_MESSAGES',
    }),
  },
}
</script>
