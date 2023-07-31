<template>
  <ex-list-item v-bind="{ active, disabled, tag }" class="justify-content-start">
    <ex-avatar>
      <ex-aws-image
        v-if="user.avatarFileId"
        :file-id="`avatars/${user.avatarFileId}`"
      />
      <template v-if="!user.avatarFileId">
        {{ initials }}
      </template>
    </ex-avatar>
    <div class="ex-list-item-text">
      <div class="ex-li-patient-name">{{ user.firstName }} {{ user.lastName}}</div>
      <div class="ex-li-patient-stats">
        <template v-if="!condensed && (surgery || days !== undefined)">
          <span v-if="surgery">
            {{ surgery }}
            <span class="ex-li-patient-stats-sep">&bull;</span>
          </span>
          <template v-if="days !== undefined">
            <span class="level-okay">
              Day <span class="ex-patient-stat-level">{{ days > 0 ? '+' : '' }}{{ days }}</span>
            </span>
            <span class="ex-li-patient-stats-sep">&bull;</span>
          </template>
        </template>
        <ex-patient-stat :pain="pain"/>
        <span class="ex-li-patient-stats-sep">&bull;</span>
        <ex-patient-stat :compliance="compliance"/>
      </div>
    </div>
    <div
      v-if="active && showChat"
      class="ml-auto pl-2"
    >
      <ex-chat-button
        :has-unread="hasUnread"
        :disabled="initializingChat || chatError !== null"
        @chat="$emit('chat')"
      />
    </div>
  </ex-list-item>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ex-patient-list-item',
  props: {
    condensed: {
      type: Boolean,
      default: false,
    },
    pain: {
      type: Number,
      default: undefined,
    },
    compliance: {
      type: Number,
      default: undefined,
    },
    user: {
      type: Object,
      required: true,
    },
    surgery: {
      type: String,
      default: undefined,
    },
    days: {
      type: Number,
      default: undefined,
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: undefined,
    },
    hasUnread: {
      type: Boolean,
      default: false,
    },
    showChat: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    initials() {
      return `${this.user.firstName.charAt(0).toUpperCase()}${this.user.lastName.charAt(0).toUpperCase()}`
    },

    ...mapState('chat', {
      initializingChat: 'initializing',
      chatError: 'error',
    }),
  },
}
</script>
