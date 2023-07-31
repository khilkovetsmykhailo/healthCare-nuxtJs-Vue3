<template>
  <ex-icon-button
    :icon="icon"
    :color="iconColor"
    class="ex-chat-button"
    :disabled="disabled"
    @click="$emit('chat')"
  >
    <font-awesome-icon
      v-if="hasUnread"
      icon="circle"
      class="ex-chat-button-notification"
      size="xs"
    />
  </ex-icon-button>
</template>

<script>
export default {
  name: 'ex-chat-button',
  props: {
    hasUnread: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: 'chat',
    },
    iconColor: {
      type: String,
      default: undefined,
    },
  },
}
</script>
