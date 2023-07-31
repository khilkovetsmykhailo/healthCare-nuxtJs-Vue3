<template>
  <div>
    <div v-if="organizationUserChannels.length > 0">
      <div
        v-for="channel in organizationUserChannels"
        :key="channel.id"
        class="p-1"
      >
        <ex-channel-list-item
          :channel="channel"
          :organization-user="currentOrganizationUser"
          @click="handleChannelClick(channel)"
        />
      </div>
    </div>
    <div
      v-if="organizationUserChannels.length <= 0"
      class="p-3 mb-0 pb-0"
    >
      <ex-empty-label>No Channels</ex-empty-label>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import ExChannelListItem from '../../channels/ChannelListItem'

export default {
  name: 'ex-step-chat-channels',
  components: { ExChannelListItem },
  computed: {
    organizationUserChannels() {
      // Only return channels for which the current org user is a member of
      return this.channels.filter((channel) => (
        channel.members.find(({ identity }) => (
          identity === this.currentOrganizationUser.User.email
        )) !== undefined
      ))
    },

    ...mapState('organization/chat', ['currentOrganizationUser']),
    ...mapState('chat', ['channels']),
  },
  methods: {
    handleChannelClick(channel) {
      this.setCurrentChannel(channel)
    },

    ...mapMutations('organization/chat', {
      setCurrentChannel: 'SET_CURRENT_CHANNEL',
    }),
  },
}
</script>
