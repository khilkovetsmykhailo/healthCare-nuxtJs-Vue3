<template>
<div class="ex-empty-state text-center">
  <font-awesome-icon
    :icon="icon"
    size="8x"
  />
  <div
    v-if="!$slots.default"
    class="mt-4 ex-empty-state-message"
  >
    {{ message }}
  </div>
  <slot/>
</div>
</template>

<script>
export default {
  name: 'ex-empty-state',
  props: {
    icon: {
      type: String,
      default: 'info-circle',
    },
    message: {
      type: String,
      default: undefined,
    },
  },
}
</script>
