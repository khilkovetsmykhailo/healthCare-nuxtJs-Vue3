<template>
  <ex-list-item class="no-card">
    <b-row class="align-items-center justify-content-between mx-0" style="flex-grow: 0; flex-wrap: nowrap">
      <ex-avatar size="large" class="float-left">
        <font-awesome-icon
          icon="user-friends"
          size="lg"
        />
      </ex-avatar>
    </b-row>
    <b-row class="align-items-center justify-content-between mx-0 w-100" style="flex-wrap: nowrap">
      <div style="flex-grow: 0">
        <p class="my-0">{{ channel.name }}</p>
      </div>
    </b-row>
    <b-row class="align-items-center justify-content-between mx-0" style="flex-grow: 0; flex-wrap: nowrap">
      <ex-chat-button
        :has-unread="hasUnread"
        @chat="$emit('click', channel)"
      />
    </b-row>
  </ex-list-item>
</template>
<script>
export default {
  name: 'ex-channel-list-item',
  props: {
    channel: { type: Object, required: true },
    organizationUser: { type: Object, required: true },
    hasUnread: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
