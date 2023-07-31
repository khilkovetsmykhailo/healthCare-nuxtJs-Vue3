<template>
  <b-card class="shadow" no-body>
    <b-card-body class="bg-Demo-light-blue">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <ex-avatar class="ex-chat-messages-channel-avatar">
            <font-awesome-icon icon="user"/>
          </ex-avatar>
          <h5
            v-if="!currentChannel"
            class="mb-0 ml-2"
          >
            {{ organizationUser.User.firstName }}
            {{ organizationUser.User.lastName }}
          </h5>
          <h5
            v-if="currentChannel"
            class="mb-0 ml-2"
          >
            {{ currentChannel.name }}
          </h5>
        </div>

        <ex-icon-button
          icon="arrow-left"
          font-awesome
          color="invert"
          @click="handleCancelChat"
        />
      </div>
    </b-card-body>
    <div>
      <transition name="fade" mode="out-in">
        <ex-step-chat-channels v-if="!currentChannel"/>
        <ex-step-chat-messages v-if="currentChannel"/>
      </transition>
    </div>
  </b-card>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import ExStepChatChannels from './steps/ChatChannels'
import ExStepChatMessages from './steps/ChatMessages'

export default {
  name: 'ex-chat',
  props: {
    organizationUser: {
      type: Object,
      required: true,
    },
  },
  components: {
    ExStepChatChannels,
    ExStepChatMessages,
  },
  computed: {
    ...mapState('organization/chat', ['currentChannel'])
  },
  methods: {
    handleCancelChat() {
      this.resetChat()
    },

    ...mapMutations('organization/chat', {
      resetChat: 'RESET',
    })
  },
}
</script>
