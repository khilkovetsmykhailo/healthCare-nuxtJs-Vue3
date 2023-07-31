<template>
  <ex-list-item v-bind="{ active, disabled, tag, noHover }">
    <b-row class="align-items-center justify-content-between mx-0">
      <ex-avatar>
        <span v-if="!user.avatarFileId">
          {{ user.firstName ? user.firstName[0].toUpperCase() : '' }}
          {{ user.lastName ? user.lastName[0].toUpperCase() : '' }}
        </span>
        <ex-aws-image
          v-if="user.avatarFileId"
          :file-id="`avatars/${user.avatarFileId}`"
        />
      </ex-avatar>
    </b-row>
    <b-row class="align-items-center justify-content-between mx-0 w-100">
      <div class="ex-list-item-text">
        <div class="capitalize">{{ user.firstName }} {{ user.lastName }}</div>
        <div class="small text-muted">
          <span v-if="!$slots.subtitle">{{ subtitle }}</span>
          <slot name="subtitle"/>
        </div>
      </div>
    </b-row>
    <b-row
      v-if="chat && active"
      class="ex-list-item-action align-items-center justify-content-between mx-0"
    >
      <ex-icon-button
        icon="chat"
        :disabled="initializingChat"
        @click.prevent="$emit('chat')"
      />
    </b-row>
  </ex-list-item>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ex-user-list-item',
  props: {
    user: {
      type: Object,
      required: true,
    },
    subtitle: {
      type: String,
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
    noHover: {
      type: Boolean,
      default: false,
    },
    chat: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('chat', {
      initializingChat: 'initializing',
    }),
  },
}
</script>
